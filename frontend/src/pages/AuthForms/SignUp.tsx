import { useState } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import styles from './AuthForms.module.scss'
import { PreAuth } from '../../App';
import Input from '../../components/Input/Input';
import Button, { ButtonStyles } from '../../components/Button/Button';
import { CreateUser } from '../../components/CreateUser/CreateUser';

interface SignInProps {
  signIn: React.Dispatch<React.SetStateAction<PreAuth | undefined>>;
}

function SignUp({ signIn }: SignInProps) {
  const [ referral, setReferral ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("")

  const auth = () => {
    // validate password
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

  const authWithGoogle = ({credential, clientId}: CredentialResponse) => {
    fetch('/api/auth/googleAuth', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        referral,
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
    <div className={`${styles.container} ${styles.signUpContainer}`}>
      <h2 className={styles.signUpHeader}>Let's Get Started on Estimax</h2>
      <CreateUser />
      {/* <div className='signUpForm'>
        <Input 
          type="text" 
          name="Referral Code:" 
          value={referral} 
          onChange={(e) => setReferral(e.target.value)}
        />
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
        <Input 
          type="password" 
          name="Confirm Password:" 
          value={password} 
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button 
          onClick={auth}
          fontSize={'1.1em'}
          buttonStyle={ButtonStyles.PRIMARY}
          wide>
            Sign Up
        </Button>
        <GoogleLogin
          onSuccess={authWithGoogle}
          onError={() => {
            console.log('Login Failed');
          }}
          text='continue_with'
        />
      </div> */}
    </div>
  );
}

export default SignUp;