import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

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
import Profile from './pages/Profile/Profile';
import ContractorFeed from './pages/ContractorFeed/ContractorFeed';
import Messages from './pages/Messages/Messages';
import FriendsAndFavorites from './pages/FriendsAndFavorites/FriendsAndFavorites';
import ContractorDashboard from './pages/ContractorDashboard/ContractorDashboard';
import { ToastProvider } from './contexts/ToastContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';

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
        path="/profile"
        element={
          <PrivateRoute forHomeowner={true} forContractor={true}>
            <Profile />
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
      <Route
        path="/messages"
        element={
          <PrivateRoute forContractor={true} forHomeowner={true}>
            <Messages />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute forContractor={true} forHomeowner={true}>
            <ContractorDashboard />
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
        path="/profile"
        element={
          <PrivateRoute forHomeowner={true} forContractor={true}>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/find-contractors"
        element={
          <PrivateRoute forHomeowner={true} forContractor={false}>
            <ContractorFeed />
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
      <Route
        path="/messages"
        element={
          <PrivateRoute forContractor={true} forHomeowner={true}>
            <Messages />
          </PrivateRoute>
        }
      />
      <Route
        path="/friends-and-favorites"
        element={
          <PrivateRoute forContractor={true} forHomeowner={true}>
            <FriendsAndFavorites />
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
  const location = useLocation();

  useEffect(() => {
    if (process.env.REACT_APP_ENV === 'prod') {
      console.log('hi')
      window.analytics.page()
    }
  }, [location])
  

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
            user: {
              ...data.user,
              uid: data.user._id
            }
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
        <ToastProvider>
          <div className={styles.AppContainer}>
            <Nav auth/>
            <AuthRoutes />
          </div>
        </ToastProvider>
    </AuthProvider>
  );



  return preAuthObj ? <Authenticated /> : <NotAuthenticated />;
}

export default App;
