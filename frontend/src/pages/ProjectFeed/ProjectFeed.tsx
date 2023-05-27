import React from 'react';

import { useAuth } from '../../contexts/AuthContext';

function ProjectFeed() {
  const auth = useAuth();



  return (
    <div className="ProjectFeed">
      <h1>Project Feed</h1>
      <button onClick={() => auth.signOut()}>Hello</button>
    </div>
  );
}

export default ProjectFeed;