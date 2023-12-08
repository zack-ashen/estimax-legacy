import { FieldValues, SubmitHandler } from "react-hook-form";
import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import { BiddingSettings } from "./Steps/BiddingSettings";
import { GeneralDetails } from "./Steps/GeneralDetails";
import { UploadMedia } from "./Steps/UploadMedia";
import { VendorInvite } from "./Steps/VendorInvite";

export default function CreateProject() {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  const steps = [GeneralDetails, UploadMedia, VendorInvite, BiddingSettings];
  return (
    <MultiStepForm
      submit={onSubmit}
      steps={steps}
      wideActionButtons={false}
      submitButtonText="Post Project"
    />
  );
}
