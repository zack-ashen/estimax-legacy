import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNonAuth } from "../../../contexts/NonAuthContext/NonAuthContext";
import { AuthService } from "../../../services/auth/auth";
import { Role } from "../../../types/user";
import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import { AccountType } from "./Steps/AccountType";
import { BasicInfo } from "./Steps/BasicInfo";
import { SignUpType } from "./Steps/SignUpType";
import { YourBusiness } from "./Steps/YourBusiness";

export default function SignUpForm() {
  const { setToken } = useNonAuth();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { confirmPassword, ...formData } = data;

    // edit for vendor
    let signUpData = formData;
    if (formData.role === Role.VENDOR) {
      signUpData.location = formData.location.value;
      signUpData.services = formData.services.map(
        (service: { value: string; label: string }) => service.value
      );
    }

    if (signUpData.googleCredential) {
      const { googleCredential, ...userDto } = signUpData;
      const { token } = await AuthService.googleAuth(
        {
          googleCredential,
          userDto,
        },
        true
      );
      setToken(token);
    } else {
      const { token } = await AuthService.signup({
        userDto: signUpData,
      });
      setToken(token);
    }
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
