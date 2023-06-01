import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing/Landing'
import SignIn from './pages/AuthForms/SignIn'
import SignUp from './pages/AuthForms/SignUp'
import ManageProjects from './pages/ManageProjects/ManageProjects';
import ProjectFeed from './pages/ProjectFeed/ProjectFeed';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import { User } from './types';

export interface PreAuth {
  user: User;
  token: string;
}

function App() {
  const [ preAuthObj, setPreAuthObj ] = useState<PreAuth | undefined>();

  useEffect(() => {
    // Get an access token
    fetch('/api/auth/refreshToken', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        // user has valid refresh token
        if (data.error !== 'No refresh token' && data.token && data.user) {
          setPreAuthObj({
            token: data.token,
            user: data.user
          });
        }
        // if the user does not have a valid refresh token they stay logged out
        // which is the default behaviour
      })
  }, []);

  const NotAuthenticated = () => (
    <Routes>
      <Route path="/" Component={Landing} />
      <Route 
        path="/signup" 
        element={<SignUp signIn={setPreAuthObj}/>} 
      />
      <Route 
        path="/signin" 
        element={<SignIn signIn={setPreAuthObj}/>} 
      />
      <Route path="*" 
          element={
            <Navigate to="/" />
          } 
       />
    </Routes>
  );

  // Routes if there is a VALID token and refresh token present
  const Authenticated = () => (
    <AuthProvider 
      removePreAuthObj={() => setPreAuthObj(undefined)}
      preAuthObj={preAuthObj!}>
        <Routes>
          <Route 
              path="/"
              element={
                <PrivateRoute forHomeowner={true} forContractor={true}>
                  <ProjectFeed />
                </PrivateRoute>
              }
          />
          <Route 
              path="/manage-projects"
              element={
                <PrivateRoute forContractor={true} forHomeowner={true}>
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
    </AuthProvider>
  );



  return preAuthObj ? <Authenticated /> : <NotAuthenticated />;
}

export default App;
