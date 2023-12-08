export type TableCell = {
  content: React.ReactNode;
  filterValue?: string; // optional value used for filtering
};

export type TableRow = TableCell[];

export type FilterFunction = (row: TableRow) => boolean;

export type TableColumn = {
  name: string;
};

export interface TableProps {
  data: TableRow[];
  columns: TableColumn[];
  header?: {
    title: string;
    buttonLabel?: string;
    buttonIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    onButtonClick?: () => void;
  };
  filters?: { label: string; logic: FilterFunction }[];
  pageSize?: number;
}
