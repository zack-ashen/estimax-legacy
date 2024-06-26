import React, { PropsWithChildren } from 'react';
import { useFormContext } from '../../contexts/MultiFormContext';
import { ReactComponent as DecorativeGrid } from '../../assets/DecorativeGrid.svg';

import styles from './MultiForm.module.scss';
import Button, { ButtonStyles } from '../Inputs/Button/Button';
import PageIndicator from '../PageIndicator/PageIndicator';

export default function MultiStepForm({ steps, submitComponent }: MultiFormProps) {
  const { currentStep } = useFormContext()!;

  const Page = steps[currentStep].page;
  
  return (
    <>
    <DecorativeGrid className={styles.formDecorativeGrid} />
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
  const { currentStep, prevStep, nextStep, submit, formData } = useFormContext()!;
  const { 
    Icon: CurrentIcon, 
    header: currentHeader, 
    subtitle: currentSubtitle } = content;
  
  const validateThenNext = async () => await validate() ? nextStep() : undefined;
  const validateThenSubmit = async () => {
    const isValid = await validate();
    if (isValid) {
      submit(formData)
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.formHeader}>
        <div className={styles.formIconContainer}>
          <CurrentIcon className={styles.formIcon} />
        </div>
        <div className={styles.formTitle}>
          <h3>{currentHeader}</h3>
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
            buttonStyle={ButtonStyles.SECONDARY}
            text={'Back'} />
        }
        {currentStep !== formSize - 1 &&
          <Button
            onClick={validateThenNext}
            buttonStyle={ButtonStyles.PRIMARY}
            text={'Continue'} />
        }
        {currentStep === formSize - 1 &&
          <Button
          onClick={validateThenSubmit}
          buttonStyle={ButtonStyles.PRIMARY}
          text={'Finish'} />
        }
      </div>
    </div>
  )
}


export interface PageContent {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  header: string;
  subtitle: string;
}

export interface PageProps {
  submitComponent?: JSX.Element;
  formSize: number;
  content: PageContent
}

interface Step {
  page: React.FunctionComponent<PageProps>;
  content: PageContent;
}

interface MultiFormProps {
  steps: Step[];
  submitComponent?: JSX.Element;
}

interface FormPageProps extends PropsWithChildren {
  validate: () => Promise<boolean>;
  submitComponent?: JSX.Element;
  content: PageContent;
  formSize: number;
}