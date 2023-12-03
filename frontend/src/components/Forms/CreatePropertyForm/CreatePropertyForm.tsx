import { FieldValues, SubmitHandler } from "react-hook-form";
import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import { BasicInfo } from "./Steps/BasicInfo";
import { UploadMedia } from "./Steps/UploadMedia";
import { VendorSelection } from "./Steps/VendorSelection";

export default function CreatePropertyForm() {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {};

  const steps = [BasicInfo, UploadMedia, VendorSelection];

  return (
    <MultiStepForm submit={onSubmit} steps={steps} wideActionButtons={false} />
  );
}
