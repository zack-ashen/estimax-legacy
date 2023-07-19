import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Project, locations } from '../../types';
import styles from './ProjectFeed.module.scss'
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import TextInput from '../../components/Inputs/TextInput/TextInput';
import MultiSelect from '../../components/Inputs/MultiSelect/MultiSelect';

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
    <>
    <div className={styles.filterContainer}>
      <div className={styles.search}>
        <TextInput name={'search'} placeholder={'Search'} value={''} onChange={() => undefined} noLabel/>
      </div>
      <div className={styles.filterItem}>
        <MultiSelect options={locations} placeholder={'Location'} setSelectedOptions={() => undefined} isMulti />
      </div>
      <div className={styles.filterItem}>
        <MultiSelect options={locations} placeholder={'Price'} setSelectedOptions={() => undefined} isMulti />
      </div>
      <div className={styles.filterItem}>
        <MultiSelect options={locations} placeholder={'Timeline'} setSelectedOptions={() => undefined} isMulti />
      </div>
      <div className={styles.filterItem}>
        <MultiSelect options={locations} placeholder={'Activity'} setSelectedOptions={() => undefined} />
      </div>
    </div>
    <div className={styles.ProjectFeed}>
      <div className={styles.projects}>
        {projects.map((project, index) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
    </>
  );
}

export default ProjectFeed;