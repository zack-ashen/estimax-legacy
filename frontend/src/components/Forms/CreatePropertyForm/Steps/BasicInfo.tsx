import { useFormContext } from "react-hook-form";
import TextInput from "../../../Inputs/TextInput/TextInput";

const BasicInfoElement = () => {
  const { register } = useFormContext();

  return (
    <>
      <TextInput
        id="basic-info-property-name"
        placeholder="Enter your property name"
        label="Property Name"
        {...register("propertyName", { required: "Property name is required" })}
      />
      {/* TODO: Add address autocomplete */}
    </>
  );
};

export const BasicInfo = {
  title: "Property Info",
  Element: BasicInfoElement,
  description: "Please enter some basic details about your property.",
};
