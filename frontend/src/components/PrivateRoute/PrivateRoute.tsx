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
  const { user } = useAuth();

  // Render the component associated with the user's role or redirect
  return componentMap[user.role] || <Navigate to="/" />;
};

export default PrivateRoute;
