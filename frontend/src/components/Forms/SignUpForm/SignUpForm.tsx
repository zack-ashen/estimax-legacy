import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import { YourBusiness } from "./Steps/YourBusiness";
import { BasicInfo } from "./Steps/BasicInfo";
import { AccountType } from "./Steps/AccountType";
import { Role } from "../../../types/user";
import { SignUpType } from "./Steps/SignUpType";
import { useState } from "react";
import FormHeader from "../FormHeader/FormHeader";
import GoogleAuth from "../../GoogleAuth/GoogleAuth";
import Button, { ButtonStyles } from "../../Button/Button";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  role: Role;
  vendorInfo?: {
    businessName: string;
    phone: string;
    location: string;
    services: string[];
  };
  propertyManagerInfo?: {
    businessName: string;
  };
};

interface SignUpFormProps {
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SignUpForm({ setToken }: SignUpFormProps) {
  const [googleCredential, setGoogleCredential] = useState<string | undefined>(
    undefined
  );
  const [createUserStage, setCreateUserStage] = useState<boolean>(false);

  const onSubmit = async (signUpFormData: any) => {
    console.log(signUpFormData);

    // const response = await signUpRequest(signUpFormData);

    // if (response.accessToken) {
    //   setToken(response.accessToken);
    // }
  };

  const steps = [SignUpType, BasicInfo, AccountType, YourBusiness];

  return (
    <MultiStepForm
      steps={steps}
      submit={onSubmit}
      defaultValues={{
        role: Role.PROPERTY_MANAGER,
      }}
      stepModificationRules={[
        {
          removeStepIndex: 1,
          condition: (formData) => formData.googleCredential !== undefined,
        },
      ]}
    />
  );
}
