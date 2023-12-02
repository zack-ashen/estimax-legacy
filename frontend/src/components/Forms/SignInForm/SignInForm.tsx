import { useForm } from "react-hook-form";
import Button, { ButtonStyles } from "../../Button/Button";
import TextInput from "../../Inputs/TextInput/TextInput";

import { useNonAuth } from "../../../contexts/NonAuthContext/NonAuthContext";
import { AuthService } from "../../../services/auth/auth";
import GoogleAuth from "../../GoogleAuth/GoogleAuth";
import styles from "./SignInForm.module.scss";

interface SignInFormValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setToken } = useNonAuth();

  const onSubmit = async (data: SignInFormValues) => {
    const { token } = await AuthService.signin(data);

    setToken(token);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.SignInForm} ${styles.Form}`}
    >
      <TextInput
        id="sign-in-email"
        label="Email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email", { required: "Email is required" })}
      />
      <TextInput
        id="sign-in-password"
        label="Password"
        type="password"
        placeholder=""
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password", { required: "Password is required" })}
      />

      <Button
        buttonStyle={ButtonStyles.PRIMARY}
        text="Sign In"
        type="submit"
        wide
      />
      <GoogleAuth type="signin" />
    </form>
  );
}
