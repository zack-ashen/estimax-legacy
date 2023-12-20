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
    let formData = new FormData();

    // Append regular fields to formData
    formData.append("expirationDate", data.expirationDate.toISOString());
    formData.append("public", data.public === "public" ? "true" : "false");
    formData.append(
      "dynamicBidding",
      data.dynamicBidding === "dynamicBidding" ? "true" : "false"
    );
    formData.append("propertyId", data.property.value);
    formData.append("propertyName", data.property.label);
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.media && data.media.length > 0) {
      data.media.forEach((file: File) => {
        formData.append("media", file);
      });
    }

    try {
      const response = await ProjectService.create(formData);

      if (!response.error) {
        const { project } = response;
        navigate(`/project/${project}`);
      }
      // handle success
    } catch (error) {
      // handle error
      console.error(error);
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
