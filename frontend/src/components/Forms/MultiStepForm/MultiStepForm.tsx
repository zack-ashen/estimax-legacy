import { useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import FormActions from "../FormActions/FormActions";
import FormHeader from "../FormHeader/FormHeader";
import styles from "./MultiStepForm.module.scss";

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
  defaultValues?: any;
  submit: SubmitHandler<FieldValues>;
  stepModificationRules?: StepModificationRule[];
  wideActionButtons?: boolean;
}

export function MultiStepForm({
  steps,
  submit,
  stepModificationRules,
  wideActionButtons = true,
  defaultValues,
}: MultiStepFormProps) {
  const methods = useForm({
    defaultValues,
  });
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
    const formData = methods.getValues();
    updateActiveSteps(formData);
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Calculate active steps based on flags
  const activeSteps = steps.filter((_, index) => activeStepFlags[index]);

  const CurrentStepComponent = activeSteps[currentStep]?.Element;

  const handleStepSubmit = (data: any) => {
    updateActiveSteps(data);
    if (currentStep === activeSteps.length - 1) {
      submit(data);
    } else {
      nextStep();
    }
  };

  return (
    <div className={styles.MultiStepForm}>
      <p className={styles.stepIndicator}>
        Step {currentStep + 1}/{activeSteps.length}
      </p>
      <FormHeader
        title={
          activeSteps[currentStep]?.altHeader || activeSteps[currentStep]?.title
        }
        subtitle={activeSteps[currentStep]?.description}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleStepSubmit)}
          className={`${styles.Form} ${styles.multiForm}`}
        >
          {CurrentStepComponent && <CurrentStepComponent />}
          {!activeSteps[currentStep]?.noActionButtons && (
            <FormActions
              altButtonDetails={{
                text: "Back",
                action: prevStep,
                wide: wideActionButtons,
              }}
              submitButtonDetails={{
                text:
                  currentStep === activeSteps.length - 1 ? "Submit" : "Next",
                wide: wideActionButtons,
              }}
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
}
