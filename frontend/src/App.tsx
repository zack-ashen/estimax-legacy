import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext/AuthContext";
import { NonAuthContext } from "./contexts/NonAuthContext/NonAuthContext";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Landing from "./pages/Landing/Landing";
import PMDashboard from "./pages/PMDashboard/PMDashboard";

function App() {
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {}, []);

  const NotAuthenticated = () => (
    <NonAuthContext.Provider value={{ setToken }}>
      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </NonAuthContext.Provider>
  );

  // Routes if there is a VALID token and refresh token present
  const Authenticated = () => (
    <AuthContext.Provider value={{ setToken, token }}>
      <Routes>
        <Route path="/" element={<PMDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthContext.Provider>
  );

  return token ? <Authenticated /> : <NotAuthenticated />;
}

export default App;
