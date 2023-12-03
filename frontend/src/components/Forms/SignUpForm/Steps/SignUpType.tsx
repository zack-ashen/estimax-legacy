import { useFormContext } from "react-hook-form";
import GoogleAuth from "../../../GoogleAuth/GoogleAuth";
import Button, { ButtonStyles } from "../../../Button/Button";
import { useRef } from "react";

function SignUpTypeElement() {
  const { setValue } = useFormContext();
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);

  const next = () => {
    hiddenSubmitRef.current && hiddenSubmitRef.current.click();
  };

  return (
    <>
      <Button
        text="Sign Up with Email"
        buttonStyle={ButtonStyles.PRIMARY}
        onClick={(event) => {
          event.preventDefault();
          setValue("googleCredential", undefined, { shouldValidate: true });
          next();
        }}
        wide
      />
      <GoogleAuth
        type="signup"
        setCredential={(credential: string) => {
          setValue("googleCredential", credential, { shouldValidate: true });
        }}
        onSubmit={next}
      />
      <button ref={hiddenSubmitRef} style={{ display: "none" }} type="submit" />
    </>
  );
}

export const SignUpType = {
  title: "Let's get started",
  Element: SignUpTypeElement,
  description: "How do you want to sign up?",
  noActionButtons: true,
};
