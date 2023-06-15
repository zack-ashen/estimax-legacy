import { useState } from 'react';
import { CredentialResponse } from '@react-oauth/google';

import styles from './AuthForms.module.scss'
import { PreAuth } from '../../App';
import { CreateUser } from '../../components/CreateUser/CreateUser';
import { MultiFormProvider } from '../../contexts/MultiFormContext';

interface SignInProps {
  signIn: React.Dispatch<React.SetStateAction<PreAuth | undefined>>;
}

export interface authWithGoogleArgs extends CredentialResponse {
  user: PreAuth | undefined;
}

function SignUp({ signIn }: SignInProps) {
  const [ referral, setReferral ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("")

  const auth = (user: PreAuth | undefined) => {
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
    
    signIn(user)
  }

  const authWithGoogle = ({credential, clientId, user}: authWithGoogleArgs) => {
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
    
    signIn(user)
  }

  return (
    <div>
      <MultiFormProvider onSubmit={auth}>
        <CreateUser auth={auth} googleAuth={authWithGoogle}/>
      </MultiFormProvider>
    </div>
  );
}

export default SignUp;