
import { useEffect, useState } from 'react';
import styles from './CreateUser.module.scss';
import { PreAuth } from '../../App';
import Button, { ButtonStyles } from '../Button/Button';
import { AuthUser } from '../../types/index';
import Input from '../Input/Input';


export interface CreateUserProps {
  signIn: React.Dispatch<React.SetStateAction<PreAuth | undefined>>;
}
interface CreateUserPageProps {
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  heading: {
    title: string;
    step: number;
  };
  hidden?: boolean;
}


export const CreateUserSection = ({ heading, children, onNext, onPrev, hidden=false}: CreateUserPageProps) => {
  const displayClass = hidden ? 'hidden' : '';

  return (
    <div className={`${styles.createUserSection} ${styles[displayClass]}`}>
        <div className={styles.stepContainer}>
          <h4>{heading.step}</h4>
        </div>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <h3>{heading.title}</h3>
          </div>
          <div className={styles.createUserContent}>
            {children}

            {/* Only render button section if not final step...handle final submit in
            parent component. */}
            {(onPrev || onNext) &&
              <div className={styles.buttonSection}>
                {onPrev && 
                  <Button
                    buttonStyle={ButtonStyles.SECONDARY}
                    onClick={onPrev}
                    fontSize='1.1em'
                    wide
                  >Back</Button>
                }
                {onNext &&
                  <Button
                    buttonStyle={ButtonStyles.PRIMARY}
                    onClick={onNext}
                    fontSize='1.1em'
                    wide
                  >Continue</Button>
                }
              </div>
            }
          </div>
        </div>
    </div>
  );
}

export const Headings = {
  GetReferralCode: {
    title: 'Do you have access?',
    step: 1
  },
  GetUserType: {
    title: 'Choose your account type?',
    step: 2
  },
  GetBusinessInfo: {
    title: 'Tell us about your business?',
    step: 3
  },
  GetUserInfo: {
    title: 'Who are you?',
    step: 3 | 4
  }


} as const;

export function CreateUser() {
  const [step, setStep] = useState(1);
  const [newUser, setNewUser] = useState<AuthUser>({});

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  useEffect(() => {

  }, [])

  return (
    <div className={styles.CreateUser}>
      <CreateUserSection heading={Headings.GetReferralCode} onNext={nextStep} hidden={step !== Headings.GetReferralCode.step}>
        <div className={styles.getReferralCodeSection}>
          <Input
            type='text'
            name='Referral Code'
            value={newUser.referral ? newUser.referral : ''} 
            onChange={(e) => setNewUser({...newUser, referral: e.target.value})}
          />
        </div>
      </CreateUserSection>
      <CreateUserSection heading={Headings.GetUserType} onNext={nextStep} onPrev={prevStep} hidden={step !== Headings.GetUserType.step}>
        <h1>Hello</h1>
      </CreateUserSection>
    </div>
  );
}