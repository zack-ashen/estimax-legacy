import { useState } from 'react';

import styles from './AuthForms.module.scss'
import { PreAuth } from '../../App';
import { ReactComponent as LockIcon } from "../../assets/LockIcon.svg";
import Button, { ButtonStyles } from '../../components/Button/Button';
import GoogleAuth from '../../components/GoogleAuth/GoogleAuth';
import Input from '../../components/Input/Input';
import { ReactComponent as DecorativeGrid } from '../../assets/DecorativeGrid.svg';

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
      <DecorativeGrid className={styles.decorativeGrid}/>
      <div className={styles.signInContainer}>
        <div className={styles.iconContainer}>
          <LockIcon className={styles.signInIcon}/>
        </div>
        <div className={styles.signInHeader}>
          <h3>Login to your account</h3>
          <p>Welcome back! Please enter your details.</p>
        </div>
        <form className={styles.authForm} method="POST" onSubmit={((e) => e.preventDefault())}>
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
              wide>Continue</Button>
            <GoogleAuth signIn={signIn}/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;