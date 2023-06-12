import React, { useState } from 'react';
import { useFormContext } from '../../contexts/MultiFormContext';
import { ReactComponent as Logo } from '../../assets/Logo.svg';

import styles from './MultiForm.module.scss';

interface Step {
  component: React.ReactNode;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  header: string;
  subtitle: string;
}

interface MultiFormProps {
  steps: Step[];
}

export default function MultiStepForm({ steps }: MultiFormProps) {
  const form = useFormContext();
  if (!form)
    return (<></>)
  
  const { currentStep, prevStep, nextStep } = form!;

  return (
    <div className={styles.MultiForm}>
      <div className={styles.leftForm}>
        <div className={styles.iconContainer}>
          <Logo />
        </div>
        {steps.map(({Icon, header, subtitle}, index) => (
          <div key={index} className={styles.formContentsItem}> 
            <div className={styles.formContentsLeft}>
              <Icon />
              <div className={styles.verticalConnector} />
            </div>
            <div className={styles.formContentsRight}>
              <p className={styles.formContentsHeader}>{header}</p>
              <p className={styles.formContentsSubtitle}>{subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.rightForm}>
        {steps[currentStep].component}
        
        {currentStep !== 0 &&
          <button onClick={prevStep} disabled={form.currentStep === 0}>Back</button>
        }
        {currentStep !== steps.length-1 &&
          <button onClick={nextStep} disabled={currentStep === steps.length - 1}>Continue</button>
        }
      </div>
    </div>
  );
}