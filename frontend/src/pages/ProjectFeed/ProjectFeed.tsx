import { useEffect, useRef, useState } from 'react';
import { Project } from '../../types';
import styles from './ProjectFeed.module.scss'
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectFilter, { ProjectFilters } from '../../components/ProjectFilter/ProjectFilter';

function ProjectFeed() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<ProjectFilters>({
    location: [],
    currentPrice: '',
    timeline: ''
  })

  const prevFilter = useRef();
  
  useEffect(() => {
    if (prevFilter.current !== filter) {
      setProjects([])
      setPage(0)
    }
  }, [filter])
  
  // Fetch new items whenever 'page' changes
  useEffect(() => {
    fetch(`/api/project/?limit=10&offset=${page * 10}&` + new URLSearchParams({ 
      location: filter.location.join('|'), 
      currentPrice: filter.currentPrice.toString(),
      timeline: filter.timeline.toString()
     }))
      .then((res) => res.json())
      .then((data) => {
        // If there are no more items, update 'hasMore'
        if (data.length === 0) {
          setHasMore(false);
        } else {
          // Append new items to the list and increment the page number
          setProjects((prevItems) => [...prevItems, ...data]);
          setPage((prevPage) => prevPage + 1);
        }
      });
  }, [page, filter]);

  return (
    <div className={styles.ProjectFeed}>
      <ProjectFilter filter={filter} setFilter={setFilter}/>

      <div className={styles.projects}>
        <div className={styles.searchResultsHeader}>
          <p>Found {projects.length} result on your search...</p>
        </div>
      
        <div className={styles.projectGrid}>
          
          {projects.map((project, index) => (
            <ProjectCard project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectFeed;