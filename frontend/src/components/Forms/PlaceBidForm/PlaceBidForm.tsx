import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { MultiStepForm } from "../MultiStepForm/MultiStepForm";
import { BasicInfo } from "./Steps/BasicInfo";
import Experience from "./Steps/PriceDetails";
import Terms from "./Steps/Terms";

export default function CreatePropertyForm() {
  const {
    userDetails: { organization },
  } = useAuth();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {};

  const steps = [BasicInfo, Experience, Terms];

  return (
    <MultiStepForm
      submit={onSubmit}
      steps={steps}
      wideActionButtons={false}
      submitButtonText="Place Bid"
    />
  );
}
