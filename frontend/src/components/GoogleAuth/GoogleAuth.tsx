import { useEffect, useState } from "react"
import { PreAuth } from "../../App"
import { AuthUser } from "../../types";

import { GoogleLogin } from "@react-oauth/google";

interface GoogleAuthProps {
  signIn: (preAuthObj: PreAuth) => void;
  authUser?: AuthUser;
  referral?: string;
}


export default function GoogleAuth({signIn, referral, authUser}: GoogleAuthProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [buttonWidth, setButtonWidth] = useState('400');

  const handleCallbackResponse = ({credential, clientId}: CredentialResponse) => {
    fetch('/api/auth/googleAuth', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        credential: credential,
        clientId: clientId,
        referral,
        newUser: authUser
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          console.error(data.error)
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
      setButtonWidth('250')
    } else if (windowWidth >= 500 && buttonWidth === '250') {
      setButtonWidth('400')
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth, buttonWidth]);

  return (
    <GoogleLogin
      theme='outline'
      width={buttonWidth}
      onSuccess={handleCallbackResponse}
      onError={() => {
        console.log('Login Failed');
      }}
      text='continue_with'
    />
  )

}

