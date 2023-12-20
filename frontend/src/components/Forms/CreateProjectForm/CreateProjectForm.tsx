import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ProjectService } from "../../../services/projectService";
import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import { BiddingSettings } from "./Steps/BiddingSettings";
import { GeneralDetails } from "./Steps/GeneralDetails";
import { UploadMedia } from "./Steps/UploadMedia";
import { VendorInvite } from "./Steps/VendorInvite";

export default function CreateProject() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { project } = await ProjectService.create({
      ...data,
      expirationDate: data.expirationDate?.toISOString(),
      public: data.public === "public",
      dynamicBidding: data.dynamicBidding === "dynamicBidding",
    });

    console.log(project);

    if (project) {
      navigate(`/project/${project}`);
    }
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
