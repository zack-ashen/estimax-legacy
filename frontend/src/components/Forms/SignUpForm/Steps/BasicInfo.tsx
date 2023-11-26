import { useFormContext } from "react-hook-form";
import TextInput from "../../../Inputs/TextInput/TextInput";

function BasicInfoElement() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <TextInput
        id="basic-info-name"
        type="text"
        placeholder="Full Name"
        label="Full Name"
        error={errors.name?.message}
        {...register("name", { required: "Name is required" })}
      />
      <TextInput
        id="basic-info-email"
        type="email"
        placeholder="Email"
        label="Email"
        error={errors.email?.message}
        {...register("email", { required: "Email is required" })}
      />
      <TextInput
        id="basic-info-password"
        type="password"
        placeholder=""
        label="Password"
        error={errors.password?.message}
        {...register("password", { required: "Password is required" })}
      />
      <TextInput
        id="basic-info-confirm-password"
        type="password"
        placeholder=""
        label="Confirm Password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Confirm Password is required",
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
  defaultValues: {},
};
