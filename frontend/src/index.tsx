import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './App'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import PrivateRoute from './components/PrivateRoute';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" Component={App} />
      <Route path="/signup" Component={SignUp} />
      <Route path="/signin" Component={SignIn} />
      
      <Route 
          path="/project-feed"
          element={
            <PrivateRoute forHomeowner={false}>
              <SignUp />
            </PrivateRoute>
          }
       />
       <Route 
          path="/manage-projects"
          element={
            <PrivateRoute forContractor={false}>
              <SignUp />
            </PrivateRoute>
          }
       />
       <Route 
          path="/profile"
          element={
            <PrivateRoute>
              <SignUp />
            </PrivateRoute>
          }
       />
       <Route 
          path="/project"
          element={
            <PrivateRoute>
              <SignUp />
            </PrivateRoute>
          }
       />
       <Route 
          path="/post-project"
          element={
            <PrivateRoute forContractor={false}>
              <SignUp />
            </PrivateRoute>
          }
       />

       <Route path="*" 
          element={
            <Navigate to="/" />
          } 
       />
    </Routes>
  </BrowserRouter>
);