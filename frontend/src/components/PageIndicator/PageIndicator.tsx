
import styles from './PageIndicator.module.scss';

interface PageIndicatorProps {
  steps: any[];
  activeStep: number;
}


export default function PageIndicator({ steps, activeStep }: PageIndicatorProps) {

  return (
    <div className={styles.pageIndicatorContainer}>
      {steps.map((_, index) => {
        const isActiveStep = index === activeStep ? 'active' : '';
      return (
        <div className={`${styles.pageIndicator} ${styles[isActiveStep]}`} key={index}/>
      )})}

    </div>

  );

}