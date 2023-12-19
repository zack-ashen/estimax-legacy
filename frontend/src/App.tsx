import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider";
import { NonAuthProvider } from "./contexts/NonAuthContext/NonAuthProvider";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import CreateProject from "./pages/CreateProject/CreateProject";
import CreateProperty from "./pages/CreateProperty/CreateProperty";
import Landing from "./pages/Landing/Landing";
import PMDashboard from "./pages/PMDashboard/PMDashboard";
import Project from "./pages/Project/Project";
import Properties from "./pages/Properties/Properties";
import Property from "./pages/Property/Property";
import VendorDashboard from "./pages/VendorDashboard/VendorDashboard";
import VendorSearch from "./pages/VendorSearch/VendorSearch";
import { AuthService } from "./services/auth/auth";
import { Role } from "./types";

function App() {
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    AuthService.refreshToken()
      .then((res) => setToken(res.token))
      .catch((err) => {
        console.error("Error refreshing token:", err);
        // Handle the error appropriately
      });
  }, []);

  const NotAuthenticated = () => (
    <NonAuthProvider setToken={setToken}>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </NonAuthProvider>
  );

  // Routes if there is a VALID token and refresh token present
  const Authenticated = () => (
    <AuthProvider setToken={setToken} token={token!}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute
              componentMap={{
                [Role.PROPERTY_MANAGER]: <PMDashboard />,
                [Role.VENDOR]: <VendorDashboard />,
              }}
            />
          }
        />
        <Route
          path="/create-property"
          element={
            <PrivateRoute
              componentMap={{
                [Role.PROPERTY_MANAGER]: <CreateProperty />,
              }}
            />
          }
        />
        <Route
          path="/properties"
          element={
            <PrivateRoute
              componentMap={{
                [Role.PROPERTY_MANAGER]: <Properties />,
              }}
            />
          }
        />
        <Route path="/property/:id" element={<Property />} />
        <Route path="/project/:id" element={<Project />} />
        <Route
          path="/create-project"
          element={
            <PrivateRoute
              componentMap={{
                [Role.PROPERTY_MANAGER]: <CreateProject />,
              }}
            />
          }
        />
        <Route
          path="/find-vendors"
          element={
            <PrivateRoute
              componentMap={{
                [Role.PROPERTY_MANAGER]: <VendorSearch />,
              }}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );

  return token ? <Authenticated /> : <NotAuthenticated />;
}

export default App;
