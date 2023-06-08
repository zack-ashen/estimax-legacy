import { useEffect, useRef, useState } from "react"
import { PreAuth } from "../../App"
import { AuthUser } from "../../types";

import styles from './GoogleAuth.module.scss'
import { useGoogleLogin } from "@react-oauth/google";

interface GoogleAuthProps {
  signIn: (preAuthObj: PreAuth) => void;
  authUser?: AuthUser;
  referral?: string;
}


export default function GoogleAuth({signIn, referral, authUser}: GoogleAuthProps) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (!window.google) return;

    const handleCallbackResponse = (payload: any) => {
      fetch('/api/auth/googleAuth', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credential: payload.credential,
          clientId: payload.clientId,
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
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_OAUTH_CLIENT_ID!,
      callback: handleCallbackResponse
    });

    const buttonWidth = windowWidth > 1050 ? '450' : '100';

    window.google.accounts.id.renderButton(
      document.getElementById("login")!,
      { theme: 'outline', size: "large", type: 'standard', width: buttonWidth }
    );

    
  }, [authUser, referral, signIn, windowWidth])

  return (<div id="login"></div>)

}

