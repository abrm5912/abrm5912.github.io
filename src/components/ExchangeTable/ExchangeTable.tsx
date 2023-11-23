import React, { FC, useEffect, useState } from 'react';
import { Table } from 'antd';
import { EditableRow } from './EditableRow/EditableRow';
import { EditableCell } from './EditableCell/EditableCell';
import { useExchangeStore } from '../../store';
import { ColumnTypes } from '../../types/table';
import { ExchangeDataFromAPI } from '../../types/exchange';
import { useEditableTable } from '../../hooks/useEditableTable';
import { defaultColumns } from '../../constants/table';
import './ExchangeTable.css'

interface ExchangeDataType {
  key: number;
  currency: string;
  buy: number;
  sale: number;
}

interface ExchangeTableProps {
  data?: ExchangeDataFromAPI[];
}

export const ExchangeTable: FC<ExchangeTableProps> = ({ data }) => {
  const exchangeItems = useExchangeStore(state => state.items);
  const setExchangeItems = useExchangeStore(state => state.setExchangeItems);
  const updateExchangeItem = useExchangeStore(state => state.updateExchangeItem);
  const isLoading = useExchangeStore(state => state.isLoading);
  const [dataSource, setDataSource] = useState<ExchangeDataType[]>([]);

  const { columns, editedItem } = useEditableTable<ExchangeDataType>(defaultColumns, dataSource, setDataSource);

  useEffect(() => {
    if (data) {
      setExchangeItems(data.map((item: ExchangeDataFromAPI, index: number) => ({ ...item, id: index + 1 })));
    }
  }, [data]);

  useEffect(() => {
    if (!dataSource.length) {
      setDataSource(exchangeItems.map((item) => ({
        key: item.id,
        currency: `${item.ccy}/${item.base_ccy}`,
        buy: item.buy,
        sale: item.sale
      })));
    }
  }, [exchangeItems]);

  useEffect(() => {
    if (editedItem) {
      const exchangeItem = exchangeItems.find((item) => item.id === editedItem.key);
      if (exchangeItem) {
        updateExchangeItem({
          ...exchangeItem,
          buy: editedItem.buy,
          sale: editedItem.sale
        });
      }
    }
  }, [editedItem]);

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <Table
      components={components}
      bordered
      tableLayout="auto"
      rowClassName={() => 'editable-row'}
      loading={isLoading}
      className="exchange-table"
      data-testid="exchange-table"
      pagination={false}
      columns={columns as ColumnTypes}
      dataSource={dataSource}
    />
  );
};
