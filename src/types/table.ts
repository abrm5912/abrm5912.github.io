import { Table } from 'antd';

type TableProps = Parameters<typeof Table>[0];

export type ColumnTypes = Exclude<TableProps['columns'], undefined>;
