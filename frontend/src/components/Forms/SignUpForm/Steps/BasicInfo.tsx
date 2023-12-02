import * as _ from "lodash";
import React from "react";
import { useFormContext } from "react-hook-form";
import { AuthService } from "../../../../services/auth/auth";
import TextInput from "../../../Inputs/TextInput/TextInput";

function BasicInfoElement() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const debouncedCheckEmail = React.useMemo(
    () =>
      _.debounce(
        async (
          email: string,
          callback: (isValid: boolean | string) => void
        ) => {
          const { emailExists } = await AuthService.checkEmail(email);
          callback(!emailExists);
        },
        1000 // debounce time in ms
      ),
    []
  );

  const validateEmail = async (value: string) => {
    return new Promise<string | boolean>((resolve) => {
      debouncedCheckEmail(value, (isValid) => {
        resolve(isValid || "Email is already in use or invalid");
      });
    });
  };

  return (
    <>
      <TextInput
        id="basic-info-email"
        type="email"
        placeholder="Email"
        label="Email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          validate: validateEmail,
        })}
      />
      <TextInput
        id="basic-info-password"
        type="password"
        placeholder="Enter your password"
        label="Password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password", { required: "Password is required" })}
      />
      <TextInput
        id="basic-info-confirm-password"
        type="password"
        placeholder="Confirm your password"
        label="Confirm Password"
        autoComplete="confirm-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          validate: (value: string) =>
            value === watch("password") || "Passwords do not match",
        })}
      />
    </>
  );
}

export const BasicInfo = {
  title: "Basic Info",
  Element: BasicInfoElement,
  description: "Basic Info",
  altHeader: "Basic Info",
};
