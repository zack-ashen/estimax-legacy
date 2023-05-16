import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
      <Route path="/signup" Component={SignIn} />
      <Route path="/signin" Component={SignUp} />
      <PrivateRoute path="/signedin" Element={<SignUp />} /> 
    </Routes>
  </BrowserRouter>
);