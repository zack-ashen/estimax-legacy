import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider";
import { NonAuthProvider } from "./contexts/NonAuthContext/NonAuthProvider";
import SignIn from "./pages/Both/Auth/SignIn";
import SignUp from "./pages/Both/Auth/SignUp";
import Landing from "./pages/Both/Landing/Landing";
import Project from "./pages/Both/Project/Project";
import Property from "./pages/Both/Property/Property";
import CreateProject from "./pages/PM/CreateProject/CreateProject";
import CreateProperty from "./pages/PM/CreateProperty/CreateProperty";
import PMDashboard from "./pages/PM/PMDashboard/PMDashboard";
import Properties from "./pages/PM/Properties/Properties";
import VendorSearch from "./pages/PM/VendorSearch/VendorSearch";
import Vendors from "./pages/PM/Vendors/Vendors";
import ProjectExplore from "./pages/Vendor/ProjectExplore/ProjectExplore";
import VendorDashboard from "./pages/Vendor/VendorDashboard/VendorDashboard";
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
          path="/vendor/search"
          element={
            <PrivateRoute
              componentMap={{
                [Role.PROPERTY_MANAGER]: <VendorSearch />,
              }}
            />
          }
        />
        <Route
          path="/vendors"
          element={
            <PrivateRoute
              componentMap={{
                [Role.PROPERTY_MANAGER]: <Vendors />,
              }}
            />
          }
        />
        <Route
          path="/find-projects"
          element={
            <PrivateRoute
              componentMap={{
                [Role.VENDOR]: <ProjectExplore />,
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
