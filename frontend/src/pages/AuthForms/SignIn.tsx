import { useState } from 'react';

import { PreAuth } from '../../App';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

interface SignInProps {
  signIn: (preAuthObj: PreAuth) => void;
}

function SignIn({ signIn }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const auth = () => {
    fetch('/api/auth/signin', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          // TODO: invalid credentials
          console.log(data.error)
        } else {
          signIn({
            token: data.token,
            user: data.user
          })
        }
      })
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


  return (
    <div className="SignIn">
    <label>
      Email:
      <input 
        type="email" 
        name="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
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
    <button value="Sign In" onClick={auth}/>
    <GoogleLogin
      onSuccess={authWithGoogle}
      onError={() => {
        console.log('Login Failed');
      }}
      text='continue_with'
    />
    </div>
  );
}

export default SignIn;