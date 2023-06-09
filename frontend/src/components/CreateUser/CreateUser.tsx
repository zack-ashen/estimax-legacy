
import { useEffect, useState } from 'react';
import styles from './CreateUser.module.scss';
import { GetContractorInfo } from './pages/GetContractorInfo';
import { GetReferralCode } from './pages/GetReferralCode';
import { GetUserType } from './pages/GetUserType';
import { GetUserInfo } from './pages/GetUserInfo';
import { PreAuth } from '../../App';
import { AuthUser } from '../../types';


export interface CreateUserProps {
  signIn: React.Dispatch<React.SetStateAction<PreAuth | undefined>>;
}

export interface CreateUserPageProps {
  setNewUser: React.Dispatch<React.SetStateAction<AuthUser | undefined>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  hidden?: boolean;
}

export interface CreateUserElementHeaderProps {
  step: number;
  title: string;
  hidden?: boolean;
}

export const CreateUserElementHeader = ({step, title, hidden=false}: CreateUserElementHeaderProps) => {
  return (
    <div>
      <h4>{step}</h4>
      <h3>{title}</h3>
    </div>
  )
}

export function CreateUser() {
  const [step, setStep] = useState(1);
  const [newUser, setNewUser] = useState<AuthUser | undefined>(undefined);

  useEffect(() => {

  }, [])

  return (
    <div className={styles.CreateUser}>
      <GetReferralCode setNewUser={setNewUser} setStep={setStep} hidden={false}/>
      <GetUserType setNewUser={setNewUser} setStep={setStep} />
      <GetContractorInfo setNewUser={setNewUser} setStep={setStep} />
      <GetUserInfo setNewUser={setNewUser} setStep={setStep} />
    </div>
  );
}