import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'

import { TokenPayload, UserType } from '../types';
import { useAuth } from '../contexts/AuthContext';


interface PrivateRouteProps {
  children: React.ReactElement<{}>;
  forContractor?: boolean;
  forHomeowner?: boolean;
}


const PrivateRoute = ({ children, forContractor=true, forHomeowner=true }: PrivateRouteProps ) => {
  // The authentication check could be a call to an actual authentication service.
  const auth = useAuth();

  const decodedToken = jwt_decode(auth.token) as TokenPayload;

  if (decodedToken.userType === UserType.CONTRACTOR) {
    return forContractor ? <>{children}</> : <Navigate to="/" />
  }
  
  
  return forHomeowner ? <>{children}</> : <Navigate to="/" />
};

export default PrivateRoute;