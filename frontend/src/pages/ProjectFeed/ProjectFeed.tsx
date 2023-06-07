import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Project } from '../../types';

function ProjectFeed() {
  const auth = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  // Fetch new items whenever 'page' changes
  useEffect(() => {
    fetch(`/api/projects?limit=10&offset=${page * 10}`)
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
      <h1>Project Feed</h1>
    </div>
  );
}

export default ProjectFeed;