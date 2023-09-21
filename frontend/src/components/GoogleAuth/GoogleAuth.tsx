import { useEffect, useState } from "react"
import { Homeowner, FormErrors, Contractor, ContractorNoUid, HomeownerNoUid } from "../../types";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useFormContext } from "../../contexts/MultiFormContext";

interface GoogleAuthProps {
  signIn: (token: string, user: Homeowner | Contractor) => void;
  setErrors?: React.Dispatch<React.SetStateAction<FormErrors>>;
  type: string;
  user?: ContractorNoUid | HomeownerNoUid;
}

export default function GoogleAuth({signIn, setErrors, type, user}: GoogleAuthProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [buttonWidth, setButtonWidth] = useState(350);
  const formContext = useFormContext();

  const handleCallbackResponse = ({credential, clientId}: CredentialResponse) => {
    fetch('/api/auth/googleAuth', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        credential: credential,
        clientId: clientId,
        type,
        user: user
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          if (formContext) {
            formContext.setErrors({ email: data.error})
          } else if (setErrors) {
            setErrors({ email: data.error })
          } else {
            console.error(data.error)
          }
        } else {
          signIn(data.token, data.user);
        }
      })
  }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    if (windowWidth < 500) {
      setButtonWidth(250)
    } else if (windowWidth >= 500 && buttonWidth === 250) {
      setButtonWidth(420)
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth, buttonWidth]);

  return (
    <GoogleLogin
      theme='outline'
      width={350}
      onSuccess={handleCallbackResponse}
      onError={() => {
        console.error('Login Failed');
      }}
      text='continue_with'
    />
  )

}

