import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, RefreshIcon } from "../../assets/icons";
import Button, { ButtonStyles } from "../Button/Button";
import styles from "./FilterColumn.module.scss";
import { FilterObject } from "./types";

export interface FilterColumnProps {
  filters: FilterObject;
  onFilterChange: (newFilters: Record<string, string>) => void;
}

export default function FilterColumn({
  filters,
  onFilterChange,
}: FilterColumnProps) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [openFilters, setOpenFilters] = useState<Array<string>>([]);
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
    setFilterValues(updatedFilters);
    onFilterChange(updatedFilters);

    const query = new URLSearchParams(updatedFilters);
    navigate({ search: query.toString() }, { replace: true });
  };

  return (
    <div className={styles.FilterColumn}>
      <div className={styles.header}>
        <p className={styles.title}>Filter</p>
        <Button
          buttonStyle={ButtonStyles.TERTIARY}
          RightIcon={RefreshIcon}
          onClick={() => navigate(location.pathname, { replace: true })}
          iconOnly
        />
      </div>
      {Object.entries(filters).map(([key, filter]) => (
        <React.Fragment key={`fragment-${key}`}>
          <div className={styles.divider} key={`${filter.name}-divider`} />
          <div key={filter.name}>
            <div className={styles.filterHeader}>
              <p className={styles.filterName}>{filter.name}</p>
              <Button
                buttonStyle={ButtonStyles.TERTIARY}
                RightIcon={
                  openFilters.includes(key) ? ChevronDown : ChevronRight
                }
                onClick={() =>
                  setOpenFilters((prev) =>
                    prev.includes(key)
                      ? prev.filter((k) => k !== key)
                      : [...prev, key]
                  )
                }
                iconOnly
              />
            </div>
            <div
              className={`${
                styles[
                  openFilters.includes(key)
                    ? "filterContentOpen"
                    : "filterContentClosed"
                ]
              }`}
            >
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
  );
}
