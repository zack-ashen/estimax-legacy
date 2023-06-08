import { useState } from 'react';

import styles from './AuthForms.module.scss'
import { PreAuth } from '../../App';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Button, { ButtonStyles } from '../../components/Button/Button';
import GoogleAuth from '../../components/GoogleAuth/GoogleAuth';

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
    <div className={styles.container}>
    <h2>Welcome back!</h2>
      <form>
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
        <Button buttonStyle={ButtonStyles.PRIMARY} onClick={auth}>Sign In</Button>
        {/* <GoogleLogin
          theme='outline'
          onSuccess={authWithGoogle}
          onError={() => {
            console.log('Login Failed');
          }}
          text='continue_with'
        /> */}
        <GoogleAuth signIn={signIn}/>
      </form>
    </div>
  );
}

export default SignIn;