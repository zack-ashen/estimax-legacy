import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import { signOutRequest } from "./services/auth";

function App() {
  const [token, setToken] = useState<string | undefined>();

  useEffect(() => {
    // Get an access token
  }, []);

  const signOut = () => {
    setToken(undefined);
    signOutRequest();
  };

  const NotAuthenticated = () => (
    <Routes>
      <Route path="/" Component={Landing} />
      <Route path="/signup" element={<SignUp setToken={setToken} />} />
      <Route path="/signin" element={<SignIn signIn={setToken} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );

  // Routes if there is a VALID token and refresh token present
  const Authenticated = () => <></>;

  return token ? <Authenticated /> : <NotAuthenticated />;
}

export default App;
