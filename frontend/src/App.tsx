import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing/Landing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ManageProjects from './pages/ManageProjects/ManageProjects';
import ProjectFeed from './pages/ProjectFeed/ProjectFeed';
import PrivateRoute from './components/PrivateRoute';
import { isTokenExpired } from './util/auth';

function App() {
  const token = localStorage.getItem('token');
  const [ signedIn, setSignedIn ] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      // User is logged in, continue normally
    } else {
      // Token doesn't exist or has expired
    }
  }, []);

  const NotAuthenticated = () => (
    <Routes>
      <Route path="/" Component={Landing} />
      <Route path="/signup" Component={SignUp} />
      <Route path="/signin" Component={SignIn} />
      <Route path="*" 
          element={
            <Navigate to="/" />
          } 
       />
    </Routes>
  );

  const Authenticated = () => (
    <Routes>
      <Route 
          path="/project-feed"
          element={
            <PrivateRoute forHomeowner={false}>
              <ProjectFeed />
            </PrivateRoute>
          }
       />
       <Route 
          path="/manage-projects"
          element={
            <PrivateRoute forContractor={false}>
              <ManageProjects />
            </PrivateRoute>
          }
       />
       <Route path="*" 
          element={
            <Navigate to="/" />
          } 
       />
    </Routes>
  );



  return signedIn ? <Authenticated /> : <NotAuthenticated />;
}

export default App;
