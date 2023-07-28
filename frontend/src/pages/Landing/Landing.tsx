import styles from './Landing.module.scss';
import { ReactComponent as DecorativeGrid } from '../../assets/DecorativeGrid.svg'
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';
import HeroIllustration from '../../components/HeroIllustration/HeroIllustration';


function Landing() {

  return (
    <div className={styles.Landing}>
      <DecorativeGrid className={styles.decorativeGridLeft} />
      <DecorativeGrid className={styles.decorativeGridRight} />
      <div className={styles.heroSection}>
        <div>
          <h1>Connecting service pros with homeowners.</h1>
          <p>We connect service-providers to homeowners through an open bidding platform. Making free, high quality lead generation as easy as scrolling and bidding. </p>
        </div>
        <div className={styles.buttonContainer}>
          <Button buttonStyle={ButtonStyles.PRIMARY} text={'Get Started'} onClick={() => undefined} wide/>
        </div>
      </div>

      <HeroIllustration />
    </div>
  );
}

export default Landing;