export interface ColumnDefinition {
  columnDef: string;
  header: string;
  cell: (element: any) => string;
}