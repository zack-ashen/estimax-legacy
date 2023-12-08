import React, { useState } from 'react';
import styles from './TableToggleFilter.module.scss';
import Toggle from './Toggle';
import { TableRow } from '../types';

interface TableToggleFilterProps {
  filters: { label: string; logic: (row: TableRow) => boolean }[];
  onFilterChange: (filterLogic: (row: TableRow) => boolean) => void;
}

const TableToggleFilter: React.FC<TableToggleFilterProps> = ({ filters, onFilterChange }) => {
  const [activeFilterIndices, setActiveFilterIndices] = useState<number[]>([]);

  const handleFilterClick = (index: number, logic: (row: TableRow) => boolean) => {
    const newActiveFilterIndices = activeFilterIndices.includes(index) 
      ? activeFilterIndices.filter(i => i !== index) 
      : [...activeFilterIndices, index];
  
    setActiveFilterIndices(newActiveFilterIndices);
  
    if (!activeFilterIndices.includes(index)) {
      onFilterChange(logic); // Activating the filter
    } else {
      // onFilterChange(null); // Deactivating the filter
    }
  };
  

  return (
    <div className={styles.filtersContainer}>
      {filters.map((filter, index) => (
        <Toggle 
          key={index}
          text={filter.label}
          isActive={activeFilterIndices.includes(index)}
          onClick={() => handleFilterClick(index, filter.logic)}
        />
      ))}
    </div>
  );
};

export default TableToggleFilter;
