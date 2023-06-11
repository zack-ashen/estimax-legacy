
import { useCallback, useEffect, useState } from 'react';
import styles from './CreateUser.module.scss';
import { PreAuth } from '../../App';
import Button, { ButtonStyles } from '../Button/Button';
import { AuthUser, Roles } from '../../types/index';
import Input from '../Input/Input';
import ToggleCardManager, { ToggleCard } from '../ToggleCardManager/ToggleCardManager';
import { ReactComponent as HammerIcon } from '../../assets/HammerIcon.svg';
import { ReactComponent as HouseIcon } from '../../assets/HomeIcon.svg';


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
  submit?: boolean;
}


export const CreateUserSection = ({ heading, children, onNext, onPrev, hidden=false, submit=false}: CreateUserPageProps) => {
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

const roleCards : ToggleCard[] = [
  {
    state: 'Homeowner',
    header: 'Homeowner',
    description: 'Sign up as a homeowner to post projects and get bids to get your job done.',
    Icon: HouseIcon
  },
  {
    state: 'Contractor',
    header: 'Service Pro',
    description: 'Sign up as a service pro to view and bid on leads from homeowners.',
    Icon: HammerIcon
  }
]


export function CreateUser() {
  const [step, setStep] = useState(1);
  const [newUser, setNewUser] = useState<AuthUser>({});
  const [confirmPassword, setConfirmPassword] = useState('');

  const nextStep = useCallback(() => setStep((prevStep) => prevStep + 1), []);
  const prevStep = useCallback(() => setStep((prevStep) => prevStep - 1), []);
  const submit = useCallback(() => console.log(newUser), [newUser]);
  const updateUserType = useCallback((newUserRole: string) => {
    console.log(newUserRole)
    setNewUser((prevUser) => ({...prevUser, role: newUserRole as Roles}));
  }, []);

  const Headings = {
    GetReferralCode: {
      title: 'Do you have access?',
      step: 1
    },
    GetUserType: {
      title: 'Choose your account type',
      step: 2
    },
    GetBusinessInfo: {
      title: 'Tell us about your business',
      step: 3
    },
    GetUserInfo: {
      title: 'Who are you?',
      step: (newUser.role === Roles.HOMEOWNER || !newUser.role) ? 3 : 4
    }
  };

  const GetUserInfoComponent = (
    <CreateUserSection 
      heading={Headings.GetUserInfo} 
      onNext={submit} 
      onPrev={prevStep} 
      hidden={step !== Headings.GetUserInfo.step}
      submit>
        <div className={styles.userInputContainer}>
          <Input
            type='text'
            name='First Name'
            value={newUser.firstName ? newUser.firstName : ''}
            onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
          />
          <Input
            type='text'
            name='Last Name'
            value={newUser.lastName ? newUser.lastName : ''}
            onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
          />
        </div>
        <Input
          type='email'
          name='Email'
          value={newUser.email ? newUser.email : ''}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
        />
        <div className={`${styles.userInputContainer} ${styles.lastContainer}`}>
          <Input
            type='password'
            name='Password'
            value={newUser.password ? newUser.password : ''}
            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
          />
          <Input
            type='password'
            name='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
    </CreateUserSection>
  );
  
  const GetBusinessInfoComponent = (
    <CreateUserSection 
      heading={Headings.GetBusinessInfo} 
      onNext={nextStep} 
      onPrev={prevStep} 
      hidden={step !== Headings.GetBusinessInfo.step}>
        
          
    </CreateUserSection>
  );

  return (
    <div className={styles.CreateUser}>
      {/* Referral Code Section */}
      <CreateUserSection 
        heading={Headings.GetReferralCode} 
        onNext={nextStep} 
        hidden={step !== Headings.GetReferralCode.step}>
          <div className={styles.getReferralCodeSection}>
            <Input
              type='text'
              name='Referral Code'
              value={newUser.referral ? newUser.referral : ''} 
              onChange={(e) => setNewUser({...newUser, referral: e.target.value})}
            />
          </div>
      </CreateUserSection>

      {/* Get User Info Section */}
      <CreateUserSection 
        heading={Headings.GetUserType} 
        onNext={nextStep} 
        onPrev={prevStep} 
        hidden={step !== Headings.GetUserType.step}>
          <ToggleCardManager 
            cards={roleCards}
            toggleSwitch={updateUserType}
          />
      </CreateUserSection>

      {(newUser.role === Roles.HOMEOWNER || !newUser.role) && 
        <>{GetUserInfoComponent}</>
      }
      {newUser.role === Roles.CONTRACTOR &&
        <>
          {GetBusinessInfoComponent}
          {GetUserInfoComponent}
        </>
      }
    </div>
  );
}