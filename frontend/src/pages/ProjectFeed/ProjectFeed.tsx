import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Project } from '../../types';
import styles from './ProjectFeed.module.scss'
import ProjectCard from '../../components/ProjectCard/ProjectCard';

function ProjectFeed() {
  const auth = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  // Fetch new items whenever 'page' changes
  useEffect(() => {
    fetch(`/api/project/?limit=10&offset=${page * 10}`)
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
  }, [page]);


  return (
    <div className="ProjectFeed">
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectFeed;