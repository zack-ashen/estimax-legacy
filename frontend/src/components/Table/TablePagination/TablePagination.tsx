import React from 'react';
import styles from './TablePagination.module.scss';
import Button, { ButtonStyles } from '../../Button/Button';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <div className={styles.tablePaginationContainer}>
      <div className={styles.pageCounter}>Page {currentPage} of {totalPages}</div>
      <div className={styles.buttonsContainer}>
        {currentPage > 1 && <Button buttonStyle={ButtonStyles.SECONDARY} text={"Previous"} onClick={onPrevious} />}
        {currentPage < totalPages && <Button buttonStyle={ButtonStyles.SECONDARY} text={"Next"} onClick={onNext} />}
      </div>
    </div>
  );
};

export default TablePagination;
