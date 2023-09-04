import { useEffect, useState } from "react"
import { PreAuth } from "../../App"
import { AuthContractor, AuthHomeowner, FormErrors } from "../../types";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useFormContext } from "../../contexts/MultiFormContext";

interface SignInUser {
  email: string;
  password: string;
}

interface GoogleAuthProps {
  signIn: (preAuthObj: PreAuth) => void;
  user: AuthContractor | AuthHomeowner | SignInUser;
  setErrors?: React.Dispatch<React.SetStateAction<FormErrors>>;
}

export default function GoogleAuth({signIn, user, setErrors}: GoogleAuthProps) {
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
        user
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
          signIn({
            token: data.token,
            user: data.user
          })
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

