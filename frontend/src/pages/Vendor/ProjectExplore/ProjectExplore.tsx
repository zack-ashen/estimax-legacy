import { useEffect, useState } from "react";
import FilterColumn from "../../../components/FilterColumn/FilterColumn";
import VendorLayout from "../../../layouts/VendorLayout/VendorLayout";
import projectExploreFilters from "./Filters/Filter";

import { useLocation } from "react-router-dom";
import { ProjectService } from "../../../services/projectService";
import { Project } from "../../../types/project";
import styles from "./ProjectExplore.module.scss";

export default function ProjectExplore() {
  const location = useLocation();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    setFilters(paramsObj);
  }, [location.search]);

  useEffect(() => {
    ProjectService.search(filters, { page }).then((filteredProjects) => {
      if (!filteredProjects.projects) {
        console.error(filteredProjects.error);
      } else setProjects(filteredProjects.projects);
    });
  }, [filters, page]);

  return (
    <VendorLayout containerClassName={styles.container}>
      <FilterColumn
        filters={projectExploreFilters}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />
      <div className={styles.projectsContainer}>
        <div className={styles.projectsResultsHeader}>
          <p>{projects.length} projects found</p>
          <p>Sort by placeholder</p>
        </div>
      </div>
    </VendorLayout>
  );
}
