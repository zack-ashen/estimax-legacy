import { useState } from 'react';

import styles from './AuthForms.module.scss'
import { PreAuth } from '../../App';
import { ReactComponent as LockIcon } from "../../assets/LockIcon.svg";
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';
import GoogleAuth from '../../components/GoogleAuth/GoogleAuth';
import TextInput from '../../components/Inputs/TextInput/TextInput';
import { ReactComponent as DecorativeGrid } from '../../assets/DecorativeGrid.svg';
import { FormError } from '../../types';

interface SignInProps {
  signIn: (preAuthObj: PreAuth) => void;
}

function SignIn({ signIn }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormError>({});


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
          setErrors({email: data.error})
        } else {
          signIn({
            token: data.token,
            user: {
              ...data.user,
              uid: data.user._id
            }
          })
        }
      })
  }

  return (
    <>
    <DecorativeGrid className={styles.formDecorativeGrid}/>
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.formHeader}>
          <div className={styles.formIconContainer}>
            <LockIcon className={styles.formIcon}/>
          </div>
          <div className={styles.formTitle}>
            <h3>Login to your account</h3>
            <p className={styles.formSubtitle}>Welcome back! Please enter your details.</p>
          </div>
        </div>

        <form className={styles.authForm} method="POST" onSubmit={((e) => e.preventDefault())}>
          <TextInput 
            type="text" 
            name="Email:" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <TextInput 
            type="password" 
            name="Password:" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.authButtonContainer}>
            <Button 
              buttonStyle={ButtonStyles.PRIMARY} 
              onClick={auth}
              text={'Continue'}
              wide />
            <GoogleAuth signIn={signIn} user={{email, password}} setErrors={setErrors}/>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default SignIn;