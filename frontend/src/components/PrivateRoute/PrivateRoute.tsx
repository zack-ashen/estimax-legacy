import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { Role } from "../../types";

interface PrivateRouteProps {
  componentMap: {
    [key in Role]?: React.ReactElement;
  };
}

const PrivateRoute = ({ componentMap }: PrivateRouteProps) => {
  const {
    userDetails: { role },
  } = useAuth();

  // Render the component associated with the user's role or redirect
  return componentMap[role] || <Navigate to="/" />;
};

export default PrivateRoute;
