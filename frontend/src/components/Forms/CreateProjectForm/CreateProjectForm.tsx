import { FieldValues, SubmitHandler } from "react-hook-form";
import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import { GeneralDetails } from "./Steps/GeneralDetails";
import { UploadMedia } from "./Steps/UploadMedia";

export default function CreateProject() {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {};

  const steps = [GeneralDetails, UploadMedia];
  return (
    <MultiStepForm
      submit={onSubmit}
      steps={steps}
      wideActionButtons={false}
      submitButtonText="Create Project"
    />
  );
}
