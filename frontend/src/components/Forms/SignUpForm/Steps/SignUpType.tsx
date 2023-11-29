import { useFormContext } from "react-hook-form";
import GoogleAuth from "../../../GoogleAuth/GoogleAuth";
import Button, { ButtonStyles } from "../../../Button/Button";

function SignUpTypeElement() {
  const { setValue, handleSubmit, trigger } = useFormContext();

  return (
    <>
      <Button
        text="Sign Up with Email"
        buttonStyle={ButtonStyles.PRIMARY}
        onClick={() => {
          setValue("googleCredential", undefined, { shouldValidate: true });
        }}
        wide
      />
      <GoogleAuth
        type="signup"
        setCredential={(credential: string) => {
          setValue("googleCredential", credential, { shouldValidate: true });
        }}
      />
    </>
  );
}

export const SignUpType = {
  title: "Let's get started",
  Element: SignUpTypeElement,
  description: "How do you want to sign up?",
  noActionButtons: true,
};
