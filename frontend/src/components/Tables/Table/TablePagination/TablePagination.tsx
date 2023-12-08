import React from "react";
import {
  ChevronLeft,
  ChevronLeftDouble,
  ChevronRight,
  ChevronRightDouble,
} from "../../../../assets/icons";
import styles from "./TablePagination.module.scss";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onFirst,
  onLast,
}) => {
  return (
    <div className={styles.tablePaginationContainer}>
      <div className={styles.pageCounter}>
        Page {currentPage} of {totalPages}
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.paginationButton}
          onClick={onFirst}
          disabled={currentPage <= 1}
        >
          {<ChevronLeftDouble className={styles.paginationIcon} />}
        </button>
        <button
          className={styles.paginationButton}
          onClick={onPrevious}
          disabled={currentPage <= 1}
        >
          {<ChevronLeft className={styles.paginationIcon} />}
        </button>
        <button
          className={styles.paginationButton}
          onClick={onNext}
          disabled={currentPage >= totalPages}
        >
          {<ChevronRight className={styles.paginationIcon} />}
        </button>
        <button
          className={styles.paginationButton}
          onClick={onLast}
          disabled={currentPage >= totalPages}
        >
          {<ChevronRightDouble className={styles.paginationIcon} />}
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
