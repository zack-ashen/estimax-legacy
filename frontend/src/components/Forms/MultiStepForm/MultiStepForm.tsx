import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

import styles from "./MultiStepForm.module.scss";
import FormActions from "../FormActions/FormActions";
import FormHeader from "../FormHeader/FormHeader";

interface StepModificationRule {
  condition: (formData: any) => boolean;
  removeStepIndex: number;
}

interface MultiStepFormProps {
  steps: {
    title: string;
    description: string;
    altHeader?: string;
    noActionButtons?: boolean;
    Element: () => JSX.Element;
  }[];
  defaultValues: any;
  submit: (formData: any) => void;
  stepModificationRules?: StepModificationRule[];
}

export const MultiStepForm = ({
  steps,
  submit,
  stepModificationRules,
  defaultValues,
}: MultiStepFormProps) => {
  const methods = useForm({
    defaultValues,
  });
  const [activeSteps, setActiveSteps] = useState([...steps]);
  const [activeStepFlags, setActiveStepFlags] = useState(steps.map(() => true));
  const [currentStep, setCurrentStep] = useState(0);

  const updateActiveSteps = (formData: any) => {
    if (!stepModificationRules) return;

    const newActiveStepFlags = steps.map((_, index) => {
      const rule = stepModificationRules.find(
        (rule) => rule.removeStepIndex === index
      );
      return rule ? !rule.condition(formData) : true;
    });

    setActiveStepFlags(newActiveStepFlags);
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => {
    const formData = methods.getValues(); // Get current form data
    updateActiveSteps(formData);
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const CurrentStepComponent = steps.filter(
    (_, index) => activeStepFlags[index]
  )[currentStep]?.Element;

  const handleStepSubmit = (data: any) => {
    // Update formData with new data
    console.log(data);
    updateActiveSteps(data);
    nextStep();
  };

  return (
    <div className={styles.MultiStepForm}>
      <p className={styles.stepIndicator}>
        Step {currentStep + 1}/{activeStepFlags.filter(Boolean).length}
      </p>
      <FormHeader
        title={steps[currentStep].altHeader || steps[currentStep].title}
        subtitle={steps[currentStep].description}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleStepSubmit)}
          className={`${styles.Form} ${styles.multiForm}`}
        >
          <CurrentStepComponent />

          {!steps[currentStep].noActionButtons && (
            <FormActions
              altButtonDetails={{
                text: "Back",
                action: prevStep,
                wide: true,
              }}
              submitButtonDetails={{
                text: currentStep === steps.length - 1 ? "Submit" : "Next",
                wide: true,
              }}
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
};
