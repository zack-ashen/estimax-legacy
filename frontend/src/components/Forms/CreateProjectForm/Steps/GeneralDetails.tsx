import { useFormContext } from "react-hook-form";
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
