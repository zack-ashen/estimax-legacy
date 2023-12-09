import React from "react";
import {
  ChevronLeft,
  ChevronLeftDouble,
  ChevronRight,
  ChevronRightDouble,
} from "../../../../assets/icons";
import styles from "./TablePagination.module.scss";
import Button, { ButtonStyles } from "../../../Button/Button";

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
        <Button
          buttonStyle={ButtonStyles.TERTIARY}
          LeftIcon={ChevronLeftDouble}
          iconOnly 
          disabled={currentPage <= 1}
          onClick={onFirst}
        />
        <Button
          buttonStyle={ButtonStyles.TERTIARY}
          LeftIcon={ChevronLeft}
          iconOnly 
          disabled={currentPage <= 1}
          onClick={onPrevious}
        />
        <Button
          buttonStyle={ButtonStyles.TERTIARY}
          LeftIcon={ChevronRight}
          iconOnly 
          disabled={currentPage >= totalPages}
          onClick={onNext}
        />
        <Button
          buttonStyle={ButtonStyles.TERTIARY}
          LeftIcon={ChevronRightDouble}
          iconOnly 
          disabled={currentPage >= totalPages}
          onClick={onLast}
        />
      </div>
    </div>
  );
};

export default TablePagination;
