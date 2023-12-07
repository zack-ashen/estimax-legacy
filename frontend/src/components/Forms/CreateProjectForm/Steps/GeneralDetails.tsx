import { Controller, useFormContext } from "react-hook-form";
import LocationSelect from "../../../Inputs/LocationSelect/LocationSelect";
import TextArea from "../../../Inputs/TextArea/TextArea";
import TextInput from "../../../Inputs/TextInput/TextInput";

const GeneralDetailsElement = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <TextInput
        id="basic-info-project-name"
        placeholder="Enter your project name"
        label="Project Name"
        error={errors.propertyName?.message}
        {...register("name", { required: "Property name is required" })}
      />
      <Controller
        name="location"
        control={control}
        rules={{ required: "Address is required" }}
        render={({ field, fieldState: { error } }) => (
          <LocationSelect
            id={"address-search"}
            label={"Address"}
            currentOption={field.value}
            type="address"
            error={error?.message}
            placeholder="Enter your property address"
            {...field}
          />
        )}
      />
      <TextArea
        id="basic-info-description"
        label="Description"
        rows={3}
        placeholder={"Enter a description for your project"}
        {...register("description")}
      />
    </>
  );
};

export const GeneralDetails = {
  title: "Project Info",
  Element: GeneralDetailsElement,
  description: "Please enter some basic details about your project.",
};
