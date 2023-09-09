import { useEffect, useMemo } from "react";
import styles from "./CreateUserForm.module.scss";
import { PreAuth } from "../../App";
import { AuthContractor, AuthHomeowner, FormErrors, Roles } from "../../types/index";
import { ReactComponent as LockIcon } from "../../assets/LockIcon.svg";
import { ReactComponent as StoreIcon } from "../../assets/StoreIcon.svg";
import { ReactComponent as UserIcon } from "../../assets/UserIcon.svg";
import { ReactComponent as UserPickIcon } from "../../assets/UserPickIcon.svg";
import MultiForm from "../MultiForm/MultiForm";
import GetUserType from "./pages/GetUserType";
import { useFormContext } from '../../contexts/MultiFormContext';
import GetBusinessInfo from "./pages/GetBusinessInfo";
import GetUserInfo from "./pages/GetUserInfo";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

export interface CreateUserFormProps {
  signIn: React.Dispatch<React.SetStateAction<PreAuth | undefined>>;
}

const homeownerSteps = [
  {
    page: GetUserType,
    content: {
      header: "Choose your account type",
      subtitle: "Are you a service pro or homeowner?",
      Icon: UserPickIcon,
    }
  },
  {
    page: GetUserInfo,
    content: {
      header: "Your details",
      subtitle: "Enter some info about you.",
      Icon: UserIcon,
    }
  },
];

const contractorSteps = [
  ...homeownerSteps.slice(0, 1),
  {
    page: GetBusinessInfo,
    content: {
      header: "Tell us about your business",
      subtitle: "Enter some details about your business.",
      Icon: StoreIcon,
    }
  },
  ...homeownerSteps.slice(1),
];

const createUserBody = (finalData: any) : AuthHomeowner | AuthContractor => {
  const userBase = {
    email: finalData.email,
    role: finalData.role,
    name: finalData.name
  }

  if (finalData.role === Roles.CONTRACTOR) {
    return {
      ...userBase,
      businessName: finalData.businessName,
      contractorType: finalData.contractorType ? finalData.contractorType : [],
      phoneNumber: finalData.phoneNumber,
      invitedProjects: [],
      starredProjects: [],
      securedProjects: [],
      biddedProjects: [],
      reviews: []
    } as AuthContractor
  }

  return {
    ...userBase,
    preferredContractors: [],
    postedProjects: [],
    finishedProjects: []
  } as AuthHomeowner
}

const auth = (signIn: React.Dispatch<React.SetStateAction<PreAuth | undefined>>, setErrors: React.Dispatch<React.SetStateAction<FormErrors>>) => {
  return () => (finalData: any) => {
    const newUser = createUserBody(finalData);

    fetch('/api/auth/signup', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newUser,
        password: finalData.password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setErrors({ email: data.error })

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
}

export function CreateUserForm({ signIn }: CreateUserFormProps) {
  const { formData, setSubmit, setErrors } = useFormContext()!;
  useEffect(() => {
    setSubmit(auth(signIn, setErrors))
  }, [formData])

  const steps = useMemo(() => {
    return formData.role === Roles.CONTRACTOR ? contractorSteps : homeownerSteps;
  }, [formData.role]);

  const submitForm = (
    <div className={styles.googleAuthButtonContainer}>
      <GoogleAuth signIn={signIn} user={createUserBody(formData)} setErrors={setErrors}/>
      <div className={styles.submitFormDivider} />
    </div>
  );

  return (
    <div className={styles.CreateUserForm}>
      <MultiForm steps={steps} submitComponent={submitForm}/>
    </div>
  );
}
