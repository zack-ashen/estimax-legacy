import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Button, { ButtonStyles } from "../Button/Button";
import { useFormContext } from "react-hook-form";

interface GoogleAuthProps {
  setCredential?: (credential: string) => void;
  type: "signin" | "signup";
}

const GoogleAuth = ({ setCredential, type }: GoogleAuthProps) => {
  const { formState } = useFormContext();

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setCredential && setCredential(tokenResponse.access_token);
      // You can use the tokenResponse to get Google credentials or user info
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
    // You can add more configuration options here
  });

  return (
    <Button
      buttonStyle={ButtonStyles.SECONDARY}
      text="Login with Google"
      onClick={() => googleLogin()}
      type="submit"
      wide
    />
  );
};

export default GoogleAuth;
