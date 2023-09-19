import { useEffect, useMemo, useState } from "react";
import styles from "./CreateUserForm.module.scss";
import { Contractor, Homeowner, FormErrors, Roles } from "../../types/index";
import { ReactComponent as StoreIcon } from "../../assets/StoreIcon.svg";
import { ReactComponent as UserIcon } from "../../assets/UserIcon.svg";
import { ReactComponent as UserPickIcon } from "../../assets/UserPickIcon.svg";
import MultiForm from "../MultiForm/MultiForm";
import GetUserType from "./pages/GetUserType";
import { useFormContext } from '../../contexts/MultiFormContext';
import GetBusinessInfo from "./pages/GetBusinessInfo";
import GetUserInfo from "./pages/GetUserInfo";
import GoogleAuth from "../GoogleAuth/GoogleAuth";

type ContractorNoUid = Omit<Contractor, 'uid'>;
type HomeownerNoUid = Omit<Homeowner, 'uid'>;


export interface CreateUserFormProps {
  signIn: (token: string, user: Homeowner | Contractor) => void;
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

const createUserBody = (finalData: any) : HomeownerNoUid | ContractorNoUid => {
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
    } as ContractorNoUid
  }

  return {
    ...userBase,
    preferredContractors: [],
    postedProjects: [],
    finishedProjects: [],
    friends: []
  } as HomeownerNoUid
}

const auth = (signIn: (token: string, user: Homeowner | Contractor) => void, setErrors: React.Dispatch<React.SetStateAction<FormErrors>>) => {
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
          signIn(data.token, data.user);
        }
      })
  }
}

export function CreateUserForm({ signIn }: CreateUserFormProps) {
  const { formData, setSubmit, setErrors } = useFormContext()!;
  const [ user, setUser] = useState<HomeownerNoUid | ContractorNoUid>(createUserBody(formData));


  useEffect(() => {
    setUser(createUserBody(formData));
    setSubmit(auth(signIn, setErrors));
  }, [formData, signIn])

  const steps = useMemo(() => {
    return formData.role === Roles.CONTRACTOR ? contractorSteps : homeownerSteps;
  }, [formData.role]);

  const submitForm = (
    <div className={styles.googleAuthButtonContainer}>
      <GoogleAuth signIn={signIn} user={user} setErrors={setErrors} type={'signup'}/>
      <div className={styles.submitFormDivider} />
    </div>
  );

  return (
    <div className={styles.CreateUserForm}>
      <MultiForm steps={steps} submitComponent={submitForm}/>
    </div>
  );
}
