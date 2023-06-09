import { useState } from 'react';

import styles from './AuthForms.module.scss'
import { PreAuth } from '../../App';
import { CredentialResponse } from '@react-oauth/google';
import Button, { ButtonStyles } from '../../components/Button/Button';
import GoogleAuth from '../../components/GoogleAuth/GoogleAuth';
import Input from '../../components/Input/Input';

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

  return (
    <div className={styles.container}>
      <div className={styles.signInContainer}>
        <h3>Welcome back!</h3>
        <form className={styles.authForm}>
          <Input 
            type="email" 
            name="Email:" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            type="password" 
            name="Password:" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.authButtonContainer}>
            <Button 
              buttonStyle={ButtonStyles.PRIMARY} 
              onClick={auth}
              fontSize='1.1em'
              wide>Continue</Button>
            <hr className={styles.divider}/>
            <GoogleAuth signIn={signIn}/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;