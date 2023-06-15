import React, { PropsWithChildren } from 'react';
import { useFormContext } from '../../contexts/MultiFormContext';
import { ReactComponent as DecorativeGrid } from '../../assets/DecorativeGrid.svg';

import styles from './MultiForm.module.scss';
import Button, { ButtonStyles } from '../Button/Button';
import PageIndicator from '../PageIndicator/PageIndicator';


export default function MultiStepForm({ steps, submitComponent }: MultiFormProps) {
  const { currentStep } = useFormContext()!;

  const Page = steps[currentStep].page;
  
  return (
    <>
    <DecorativeGrid className={styles.decorativeGrid} />
    <div className={styles.MultiForm}>
      <Page submitComponent={submitComponent} content={steps[currentStep].content} formSize={steps.length}/>

      <div className={styles.pageIndicatorContainer}>
        <PageIndicator steps={steps} activeStep={currentStep} />
      </div>
    </div>
    </>
  );
}

export function FormPage({ validate, submitComponent, formSize, content, children}: FormPageProps) {
  const { currentStep, prevStep, nextStep, onSubmit, formData } = useFormContext()!;
  const { 
    Icon: CurrentIcon, 
    header: currentHeader, 
    subtitle: currentSubtitle } = content;
  
  const validateThenNext = async () => await validate() ? nextStep() : undefined;
  const validateThenSubmit = async () => await validate() ? onSubmit(formData) : undefined;

  return (
    <div className={styles.form}>
      <div className={styles.formHeader}>
        <div className={styles.formIconContainer}>
          <CurrentIcon className={styles.formIcon} />
        </div>
        <div className={styles.formTitle}>
          <h2>{currentHeader}</h2>
          <p className={styles.formSubtitle}>{currentSubtitle}</p>
        </div>

        {currentStep === formSize - 1 && submitComponent &&
          <div className={styles.googleAuthContainer}>
            {submitComponent}
            <div className={styles.dividerContainer}>
              <div className={styles.divider} />
              <p>OR</p>
              <div className={styles.divider} />
            </div>
          </div>
        }
      </div>

      {children}

      <div className={styles.formButtons}>
        {currentStep !== 0 &&
          <Button
            onClick={prevStep}
            buttonStyle={ButtonStyles.SECONDARY}>Back</Button>
        }
        {currentStep !== formSize - 1 &&
          <Button
            onClick={validateThenNext}
            buttonStyle={ButtonStyles.PRIMARY}
          >Continue</Button>
        }
        {currentStep === formSize - 1 &&
          <Button
          onClick={validateThenSubmit}
          buttonStyle={ButtonStyles.PRIMARY}>
            Finish
          </Button>
        }
      </div>
    </div>
  )
}


interface StepContent {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  header: string;
  subtitle: string;
}

export interface PageProps {
  submitComponent: JSX.Element;
  formSize: number;
  content: StepContent
}

interface Step {
  page: React.FunctionComponent<PageProps>;
  content: StepContent;
}

interface MultiFormProps {
  steps: Step[];
  submitComponent: JSX.Element;
}

interface FormPageProps extends PropsWithChildren {
  validate: () => Promise<boolean>;
  submitComponent: JSX.Element;
  content: StepContent;
  formSize: number;
}