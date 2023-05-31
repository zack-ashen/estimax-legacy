import { useState, useEffect } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import { PreAuth } from '../App';

interface SignInProps {
  signIn: React.Dispatch<React.SetStateAction<PreAuth | undefined>>;
}

function SignUp({ signIn }: SignInProps) {
  const [ referral, setReferral ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("")

  useEffect(() => {
  }, []);

  const auth = () => {
    // validate password
    // TODO: Confirm password error handling
    if (password !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }

    fetch('/api/auth/signup', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        referral
      })
    })
      .then(response => response.json())
      .then(data => signIn({
        token: data.token,
        user: data.user
      }))
  }

  const authWithGoogle = ({credential, clientId}: CredentialResponse) => {
    fetch('/api/auth/googleAuth', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId,
        credential
      })
    })
      .then(response => response.json())
      .then(data => signIn({
        token: data.token,
        user: data.user
      }))
  }

  return (
    <div className="SignUp">
      <div className='signUpForm'>
        <label>
          Referral Code:
          <input 
            type="text" 
            name="referral" 
            value={referral}
            onChange={(e) => setReferral(e.target.value)}/>
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          Password:
          <input
            type="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm your password:
          <input 
            type="password" 
            name="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className="signUpButton" onClick={auth}>Sign Up</button>
        <GoogleLogin
          onSuccess={authWithGoogle}
          onError={() => {
            console.log('Login Failed');
          }}
          text='continue_with'
        />;
      </div>
    </div>
  );
}

export default SignUp;