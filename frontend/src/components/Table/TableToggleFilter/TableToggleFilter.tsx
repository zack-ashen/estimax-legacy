import React, { useState } from 'react';
import styles from './TableToggleFilter.module.scss';
import Toggle from './Toggle';
import { TableRow } from '../types';

interface TableToggleFilterProps {
  filters: { label: string; logic: (row: TableRow) => boolean }[];
  setFilters: React.Dispatch<React.SetStateAction<((row: TableRow) => boolean)[]>>;
}

const TableToggleFilter: React.FC<TableToggleFilterProps> = ({ filters, setFilters }) => {
  const [activeFilterIndices, setActiveFilterIndices] = useState<number[]>([]);

  const handleFilterClick = (index: number, logic: (row: TableRow) => boolean) => {
    setActiveFilterIndices(prev => {
      const newIndices = prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index];

      const newFilters = newIndices.map(i => filters[i].logic);
      setFilters(newFilters);

      return newIndices;
    });
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
