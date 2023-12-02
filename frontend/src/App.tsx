import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext/AuthProvider";
import { NonAuthProvider } from "./contexts/NonAuthContext/NonAuthProvider";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Landing from "./pages/Landing/Landing";
import PMDashboard from "./pages/PMDashboard/PMDashboard";
import VendorDashboard from "./pages/VendorDashboard/VendorDashboard";
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
        <Route path="/" element={<PMDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );

  return token ? <Authenticated /> : <NotAuthenticated />;
}

export default App;
