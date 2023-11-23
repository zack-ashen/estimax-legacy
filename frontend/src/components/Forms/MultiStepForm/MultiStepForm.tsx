import { FormProvider, useForm } from "react-hook-form";
import Form from "../Form/Form";
import { useState } from "react";

import styles from "./MultiStepForm.module.scss";

interface MultiStepFormProps {
  steps: {
    title: string;
    description: string;
    altHeader?: string;
    element: JSX.Element;
    defaultValues: any;
  }[];
  handleSubmit: (data: any) => void;
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

export const MultiStepForm = ({ steps, handleSubmit }: MultiStepFormProps) => {
  const methods = useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const handleStepSubmit = (data: any) => {
    // Update formData with new data
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
        <Form
          defaultValues={steps[currentStep].defaultValues}
          submitButtonDetails={
            currentStep === steps.length - 1
              ? {
                  text: "Submit",
                  action: handleSubmit,
                }
              : {
                  text: "Next",
                  action: nextStep,
                }
          }
          altButtonDetails={
            currentStep === 0
              ? undefined
              : {
                  text: "Previous",
                  action: prevStep,
                }
          }
        >
          {steps[currentStep].element}
        </Form>
      </FormProvider>
    </div>
  );
};
