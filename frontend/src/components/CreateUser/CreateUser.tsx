import { useMemo } from "react";
import styles from "./CreateUser.module.scss";
import { PreAuth } from "../../App";
import { Roles } from "../../types/index";
import { ReactComponent as LockIcon } from "../../assets/LockIcon.svg";
import { ReactComponent as StoreIcon } from "../../assets/StoreIcon.svg";
import { ReactComponent as UserIcon } from "../../assets/UserIcon.svg";
import { ReactComponent as UserPickIcon } from "../../assets/UserPickIcon.svg";
import MultiForm from "../MultiForm/MultiForm";
import GetReferralCode from "./pages/GetReferralCode";
import GetUserType from "./pages/GetUserType";
import { useFormContext } from "../../contexts/MultiFormContext";
import GetBusinessInfo from "./pages/GetBusinessInfo";
import GetUserInfo from "./pages/GetUserInfo";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { authWithGoogleArgs } from "../../pages/AuthForms/SignUp";

export interface CreateUserProps {
  auth: (user: PreAuth | undefined) => void;
  googleAuth: ({ credential, clientId, user }: authWithGoogleArgs) => void;
}

const homeownerSteps = [
  {
    page: GetReferralCode,
    content: {
      header: "Do you have access?",
      subtitle: "Enter your referral code to get access to Estimax.",
      Icon: LockIcon,
    }
  },
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
  ...homeownerSteps.slice(0, 2),
  {
    page: GetBusinessInfo,
    content: {
      header: "Tell us about your business",
      subtitle: "Enter some details about your business.",
      Icon: StoreIcon,
    }
  },
  ...homeownerSteps.slice(2),
];

export function CreateUser({ auth, googleAuth }: CreateUserProps) {
  const { formData: newUser } = useFormContext()!;


  const steps = useMemo(() => {
    return newUser.role === Roles.CONTRACTOR ? contractorSteps : homeownerSteps;
  }, [newUser.role]);

  const submitForm = (
    <div className={styles.googleAuthButtonContainer}>
      <GoogleAuth signIn={() => newUser as PreAuth}/>
      <div className={styles.submitFormDivider} />
    </div>
  );

  return <MultiForm steps={steps} submitComponent={submitForm}/>;
}
