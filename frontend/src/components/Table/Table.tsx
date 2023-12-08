import React, { useEffect, useState } from 'react';
import styles from './Table.module.scss';
import TableHeader from './TableHeader/TableHeader';
import TableToggleFilter from './TableToggleFilter/TableToggleFilter';
import TablePagination from './TablePagination/TablePagination';
import { TableColumn, TableRow } from './types';

interface TableProps {
  data: TableRow[];
  columns: TableColumn[];
  header?: { 
    title: string; 
    buttonLabel?: string; 
    buttonIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    onButtonClick?: () => void; 
  };
  filters?: { label: string; logic: (row: TableRow) => boolean }[];
  pageSize?: number;
}

const Table: React.FC<TableProps> = ({ data, columns, pageSize = 10, header, filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<((row: TableRow) => boolean)[]>([]);
  const [filteredData, setFilteredData] = useState<TableRow[]>([]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentPageData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    if (activeFilters.length > 0) {
      setFilteredData(data.filter(row => activeFilters.some(filter => filter(row))));
      setCurrentPage(1);
    } else {
      setFilteredData(data);
    }
  }, [data, activeFilters]);

  const handlePreviousPage = () => {
    setCurrentPage(current => Math.max(1, current - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(current => Math.min(totalPages, current + 1));
  };

  return (
    <div>
      {header && <TableHeader title={header.title} buttonLabel={header.buttonLabel} buttonIcon={header.buttonIcon} onButtonClick={header.onButtonClick} />}
      {filters && <TableToggleFilter filters={filters} setFilters={setActiveFilters} />}
      <div className={styles.tableContentContainer}>
        <table>
          <tr className={styles.columnTitleRow}>
            {columns.map((column, index) => (
              <th key={index} className={styles.columnTitleCell}>{column.name}</th>
            ))}
          </tr>
          <tbody>
            {currentPageData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className={styles.tableCell}>{cell.content}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && <TablePagination currentPage={currentPage} totalPages={totalPages} onPrevious={handlePreviousPage} onNext={handleNextPage} />}
      </div>
    </div>
  );
};

export default Table;
