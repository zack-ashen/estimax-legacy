import { useEffect, useState } from "react";
import {
  Homeowner,
  FormErrors,
  Contractor,
  ContractorNoUid,
  HomeownerNoUid,
} from "../../types";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useFormContext } from "../../contexts/MultiFormContext";

interface GoogleAuthProps {
  setErrors?: React.Dispatch<React.SetStateAction<FormErrors>>;
  type: "signin" | "signup";
  user?: ContractorNoUid | HomeownerNoUid;
}

export default function GoogleAuth({ type, user }: GoogleAuthProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [buttonWidth, setButtonWidth] = useState(350);

  const handleCallbackResponse = ({
    credential,
    clientId,
  }: CredentialResponse) => {
    // auth with google service
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    if (windowWidth < 500) {
      setButtonWidth(250);
    } else if (windowWidth >= 500 && buttonWidth === 250) {
      setButtonWidth(420);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth, buttonWidth]);

  return (
    <GoogleLogin
      theme="outline"
      width={350}
      onSuccess={handleCallbackResponse}
      onError={() => {
        console.error("Login Failed");
      }}
      text="continue_with"
    />
  );
}
