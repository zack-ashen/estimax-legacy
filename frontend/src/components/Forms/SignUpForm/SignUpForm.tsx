import { ChangeEvent } from "react";
import TextInput from "../../TextInput/TextInput";
import Form from "../Form/Form";
import { signUpRequest } from "../../../services/auth";
import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import { YourBusiness } from "./Steps/YourBusiness";
import { BasicInfo } from "./Steps/BasicInfo";
import { AccountType } from "./Steps/AccountType";

type SignUpFormData = {
  // Define your sign-in form fields here
  username: string;
  password: string;
};

interface SignUpFormProps {
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SignUpForm({ setToken }: SignUpFormProps) {
  const onSubmit = async (signUpFormData: SignUpFormData) => {
    console.log(signUpFormData);

    const response = await signUpRequest(signUpFormData);

    if (response.accessToken) {
      setToken(response.accessToken);
    }
  };

  const steps = [BasicInfo, AccountType, YourBusiness];

  return <MultiStepForm steps={steps} handleSubmit={onSubmit} />;
}
