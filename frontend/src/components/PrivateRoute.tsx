import React, { ComponentType } from 'react';
import { Route, Link, PathRouteProps, Navigate } from 'react-router-dom';


interface PrivateRouteProps extends PathRouteProps {
  Element: React.ReactElement<{}>;
}


const PrivateRoute = ({ Element, ...rest }: PrivateRouteProps ) => {
  // The authentication check could be a call to an actual authentication service.
  const isAuthenticated = localStorage.getItem('auth');

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;