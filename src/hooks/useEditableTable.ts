import { Dispatch, SetStateAction, useState } from 'react';
import { ColumnTypes } from '../types/table';

type DefaultColumnsType = (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[];

export function useEditableTable<DataType>(
  defaultColumns: DefaultColumnsType,
  dataSource: (DataType & { key: number })[],
  setDataSource: Dispatch<SetStateAction<DataType[]>>
) {
  const [editedItem, setEditedItem] = useState<DataType>();

  const handleSave = (row: DataType & { key: number }) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const dataSourceItem = newData[index];
    setEditedItem(row);
    newData.splice(index, 1, {
      ...dataSourceItem,
      ...row,
    });
    setDataSource(newData);
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return {
    columns,
    editedItem
  };
}
