import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "../Inputs/Select/Select";
import styles from "./FilterBar.module.scss";
import { FilterObject, SortByFunction } from "./types";

export interface FilterBarProps {
  filters: FilterObject;
  sortBy?: {
    name: string;
    sortByFunction: SortByFunction;
  }[];
}

export default function FilterBar({ filters, sortBy }: FilterBarProps) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const newFilters: Record<string, string> = {};
    query.forEach((value, key) => (newFilters[key] = value));
    setFilterValues(newFilters);
  }, [location]);

  const handleFilterUpdate = (name: string, value: string) => {
    const updatedFilters = { ...filterValues, [name]: value };

    if (!value) delete updatedFilters[name];

    setFilterValues(updatedFilters);

    const query = new URLSearchParams(updatedFilters);
    navigate({ search: query.toString() }, { replace: true });
  };

  return (
    <div className={styles.FilterBar}>
      <div className={styles.filtersContainer}>
        {Object.entries(filters).map(([key, filter]) => (
          <React.Fragment key={`fragment-${key}`}>
            <div key={filter.name}>
              <div>
                {React.createElement(filter.component, {
                  value: filterValues[filter.name],
                  onChange: (newValue: string) =>
                    handleFilterUpdate(key, newValue),
                })}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      {sortBy && (
        <div className={styles.SortByContainer}>
          <Select
            options={sortBy.map((sort) => ({
              value: sort.sortByFunction,
              label: sort.name,
            }))}
            placeholder="Sort by"
            onChange={(newValue: SortByFunction) => newValue()}
          />
        </div>
      )}
    </div>
  );
}
