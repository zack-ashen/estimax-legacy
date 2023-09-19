import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Landing from './pages/Landing/Landing'
import SignIn from './pages/AuthForms/SignIn'
import SignUp from './pages/AuthForms/SignUp'
import ManageProjects from './pages/ManageProjects/ManageProjects';
import ProjectFeed from './pages/ProjectFeed/ProjectFeed';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PostProject from './pages/PostProject/PostProject';
import Project from './pages/Project/Project';
import Profile from './pages/Profile/Profile';
import ContractorFeed from './pages/ContractorFeed/ContractorFeed';
import Messages from './pages/Messages/Messages';
import FriendsAndFavorites from './pages/FriendsAndFavorites/FriendsAndFavorites';
import ContractorDashboard from './pages/ContractorDashboard/ContractorDashboard';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

import { Contractor, Homeowner, Roles } from './types';

const AuthRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      { user.role === Roles.CONTRACTOR &&
      <Route
        path="/"
        element={
          <PrivateRoute forHomeowner={false} forContractor={true}>
            <ProjectFeed />
          </PrivateRoute>
        }
      />
      }
      { user.role === Roles.HOMEOWNER &&
        <Route
          path="/"
          element={
            <PrivateRoute forHomeowner={true} forContractor={false}>
              <ManageProjects />
            </PrivateRoute>
          }
        />
      }
      <Route
        path="/profile"
        element={
          <PrivateRoute forHomeowner={true} forContractor={true}>
            <Profile />
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
          <PrivateRoute forContractor={true} forHomeowner={false}>
            <ContractorDashboard />
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
        path="/friends-and-favorites"
        element={
          <PrivateRoute forContractor={false} forHomeowner={true}>
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
  const [ token, setToken ] = useState<string | undefined>();
  const [ user, setUser ] = useState<Homeowner | Contractor | undefined>();

  const location = useLocation();

  useEffect(() => {
    if (process.env.REACT_APP_ENV === 'prod') {
      window.analytics.page()
    }
  }, [location])

  const signIn = (token: string, user: Homeowner | Contractor) => {
    setToken(token);
    setUser(user);
  }

  const signOut = () => {
    setToken(undefined);
    setUser(undefined);
  }

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
          signIn(data.token, data.user);
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
        element={<SignUp signIn={signIn}/>} 
      />
      <Route 
        path="/signin" 
        element={<SignIn signIn={signIn}/>} 
      />
      <Route path="*" 
        element={
          <Navigate to="/" />
        } 
      />
    </Routes>
  );

  // Routes if there is a VALID token and refresh token present
  const Authenticated = () => (token && user) ? (
    <AuthProvider 
      removeToken={signOut}
      setToken={setToken}
      token={token}
      user={user}>
        <ToastProvider>
          <AuthRoutes />
        </ToastProvider>
    </AuthProvider>
  ) : (<></>);



  return (token && user) ? <Authenticated /> : <NotAuthenticated />;
}

export default App;
