import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import styles from './App.module.scss'
import Landing from './pages/Landing/Landing'
import SignIn from './pages/AuthForms/SignIn'
import SignUp from './pages/AuthForms/SignUp'
import ManageProjects from './pages/ManageProjects/ManageProjects';
import ProjectFeed from './pages/ProjectFeed/ProjectFeed';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Roles, User } from './types';
import Nav from './components/Nav/Nav';
import PostProject from './pages/PostProject/PostProject';
import Project from './pages/Project/Project';

export interface PreAuth {
  user: User;
  token: string;
}



const AuthRoutes = () => {
  const { user } = useAuth();
  
  return user.role === Roles.CONTRACTOR ? (
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
      <Route
        path="/project/:id"
        element={
          <PrivateRoute forContractor={true} forHomeowner={true}>
            <Project />
          </PrivateRoute>
        }
      />
      <Route path="*"
        element={
          <Navigate to="/" />
        }
      />
    </Routes>
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute forHomeowner={true} forContractor={true}>
            <ManageProjects />
          </PrivateRoute>
        }
      />
      <Route
        path="/post-project"
        element={
          <PrivateRoute forContractor={false} forHomeowner={true}>
            <PostProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/project/:id"
        element={
          <PrivateRoute forContractor={false} forHomeowner={true}>
            <Project />
          </PrivateRoute>
        }
      />
      <Route path="*"
        element={
          <Navigate to="/" />
        }
      />
    </Routes>
  )
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
    <div className={styles.AppContainer}>
      <Nav />
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
    </div>
  );

  // Routes if there is a VALID token and refresh token present
  const Authenticated = () => (
    <AuthProvider 
      removePreAuthObj={() => setPreAuthObj(undefined)}
      preAuthObj={preAuthObj!}>
        <div className={styles.AppContainer}>
          <Nav auth/>
          <AuthRoutes />
        </div>
    </AuthProvider>
  );



  return preAuthObj ? <Authenticated /> : <NotAuthenticated />;
}

export default App;
