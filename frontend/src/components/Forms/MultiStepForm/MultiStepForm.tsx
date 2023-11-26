import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

import styles from "./MultiStepForm.module.scss";
import FormActions from "../FormActions/FormActions";

interface MultiStepFormProps {
  steps: {
    title: string;
    description: string;
    altHeader?: string;
    Element: () => JSX.Element;
  }[];
  defaultValues: any;
  submit: (formData: any) => void;
}

const Step = (title: string, index: number, selectedStep: number) => {
  const selected = index === selectedStep;

  return (
    <div className={styles.stepContainer} key={index}>
      <div
        className={`${
          styles[selected ? "stepIndexContainerSelected" : "stepIndexContainer"]
        }`}
      >
        <p
          className={`${styles[selected ? "stepIndexSelected" : "stepIndex"]}`}
        >
          {index + 1}
        </p>
      </div>
      <p className={`${styles[selected ? "stepTitleSelected" : "stepTitle"]}`}>
        {title}
      </p>
    </div>
  );
};

export const MultiStepForm = ({
  steps,
  submit,
  defaultValues,
}: MultiStepFormProps) => {
  const methods = useForm({
    defaultValues,
  });
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const CurrentStepComponent = steps[currentStep].Element;

  const handleStepSubmit = (data: any) => {
    // Update formData with new data
    console.log(data);
    nextStep();
  };

  return (
    <div className={styles.MultiStepForm}>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => Step(step.title, index, currentStep))}
      </div>

      <div className={styles.headerContainer}>
        <p className={`${styles.SectionHeader} ${styles.Heading}`}>
          {steps[currentStep].altHeader || steps[currentStep].title}
        </p>
        <p className={`${styles.SectionSubtitle}`}>
          {steps[currentStep].description}
        </p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleStepSubmit)}
          className={`${styles.Form} ${styles.multiForm}`}
        >
          <CurrentStepComponent />

          <FormActions
            altButtonDetails={{
              text: "Back",
              action: prevStep,
            }}
            submitButtonDetails={{
              text: currentStep === steps.length - 1 ? "Submit" : "Next",
            }}
          />
        </form>
      </FormProvider>
    </div>
  );
};
