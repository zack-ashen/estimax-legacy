import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PropertyService } from "../../../services/propertyService";
import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import { BasicInfo } from "./Steps/BasicInfo";
import { UploadMedia } from "./Steps/UploadMedia";
import { VendorSelection } from "./Steps/VendorSelection";

export default function CreatePropertyForm() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const property = {
      ...data,
      location: data.location.value,
      type: data.type.value,
    };

    const response = await PropertyService.create({
      property: property,
    });

    if (!response.error) {
      console.log(response);
      const { property } = response;
      navigate(`/property/${property}`);
    }

    // handle error
    // ...
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
