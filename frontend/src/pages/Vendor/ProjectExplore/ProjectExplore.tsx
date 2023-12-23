import { useEffect, useState } from "react";
import FilterBar from "../../../components/FilterColumn/FilterBar";
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
      <FilterBar
        filters={projectExploreFilters}
        sortBy={[
          {
            name: "Most recent",
            sortByFunction: () => {
              setProjects((projects) => [...projects].reverse());
            },
          },
        ]}
      />
      <div className={styles.projectsContainer}>
        {projects.map((project) => (
          <div className={styles.projectCard} key={project.id}>
            <div className={styles.projectCardHeader}>
              <div className={styles.projectCardTitle}>{project.name}</div>
              <div className={styles.projectCardDate}></div>
            </div>
            <div className={styles.projectCardDescription}>
              {project.description}
            </div>
          </div>
        ))}
      </div>
    </VendorLayout>
  );
}
