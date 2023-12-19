import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { PropertyService } from "../../../services/propertyService";
import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import { BasicInfo } from "./Steps/BasicInfo";
import { UploadMedia } from "./Steps/UploadMedia";
import { VendorSelection } from "./Steps/VendorSelection";

export default function CreatePropertyForm() {
  const {
    userDetails: { organization },
  } = useAuth();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let formData = new FormData();

    // Append regular fields to formData
    formData.append("name", data.name);
    formData.append("location", data.location.value);
    formData.append("type", data.type.value);
    formData.append("organization", organization as string);
    if (data.media && data.media.length > 0) {
      data.media.forEach((file: File) => {
        formData.append("media", file);
      });
    }

    console.log(formData);

    try {
      const response = await PropertyService.create(formData);

      if (!response.error) {
        const { property } = response;
        navigate(`/property/${property}`);
      }
      // handle success
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  const steps = [BasicInfo, UploadMedia, VendorSelection];

  return (
    <MultiStepForm
      submit={onSubmit}
      steps={steps}
      wideActionButtons={false}
      submitButtonText="Create Property"
    />
  );
}
