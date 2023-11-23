import { ColumnType } from 'antd/es/table';
import { AnyObject } from 'antd/es/_util/type';

type RecordType = ColumnType<AnyObject> & { editable?: boolean | undefined; dataIndex: string; }

export const defaultColumns: RecordType[] = [
  {
    title: 'Currency',
    dataIndex: 'currency',
    width: '10%',
    align: 'center'
  },
  {
    title: 'Buy',
    dataIndex: 'buy',
    editable: true,
    width: 150,
    align: 'center'
  },
  {
    title: 'Sell',
    dataIndex: 'sale',
    editable: true,
    width: 150,
    align: 'center'
  },
];
