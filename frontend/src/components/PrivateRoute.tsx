import React from 'react';
import { Navigate } from 'react-router-dom';


interface PrivateRouteProps {
  children: React.ReactElement<{}>;
  forContractor?: boolean;
  forHomeowner?: boolean;
}


const PrivateRoute = ({ children, forContractor=true, forHomeowner=true }: PrivateRouteProps ) => {
  // The authentication check could be a call to an actual authentication service.
  const isAuthenticated = localStorage.getItem('auth');
  const localUserType = localStorage.getItem('userType');

  // todo: handle user type private routing

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;