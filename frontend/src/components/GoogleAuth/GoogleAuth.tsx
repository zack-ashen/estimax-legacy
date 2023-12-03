import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNonAuth } from "../../contexts/NonAuthContext/NonAuthContext";
import { AuthService } from "../../services/auth/auth";

interface GoogleAuthProps {
  setCredential?: (credential: string) => void;
  onSubmit?: () => void;
  type: "signin" | "signup";
}

const GoogleAuth = ({ setCredential, type, onSubmit }: GoogleAuthProps) => {
  const { setToken } = useNonAuth();
  const [buttonWidth, setButtonWidth] = useState(335);

  const handleCallbackResponse = async ({
    credential,
    clientId,
  }: CredentialResponse) => {
    if (type === "signup") {
      setCredential && setCredential(credential!);
      onSubmit && onSubmit();
    }

    const result = await AuthService.googleAuth(
      { googleCredential: credential! },
      false
    );
    if (result?.token) {
      setToken(result.token);
    } else {
      console.error("User doesn't exist");
    }
  };

  return (
    <GoogleLogin
      theme="outline"
      width={buttonWidth}
      onSuccess={handleCallbackResponse}
      onError={() => {
        console.error("Login Failed");
      }}
      text="continue_with"
    />
  );
};

export default GoogleAuth;
