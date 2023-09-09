import styles from './Landing.module.scss';
import { ReactComponent as DecorativeGrid } from '../../assets/DecorativeGrid.svg'
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';
import HeroIllustration from '../../components/HeroIllustration/HeroIllustration';


function Landing() {

  return (
    <div className={styles.Landing}>
      {/* <DecorativeGrid className={styles.decorativeGridLeft} /> */}
      <DecorativeGrid className={styles.decorativeGridRight} />
      <div className={styles.heroSection}>
        <div>
          <h1>Get a fair price from your favorite pros, every time.</h1>
          <p>We connect service-providers to homeowners through an open bidding platform. Making free, high quality lead generation as easy as scrolling and bidding. </p>
        </div>
        <Button buttonStyle={ButtonStyles.PRIMARY} text={'Get Started'} onClick={() => undefined}/>
      </div>

      <HeroIllustration />


      <section className={styles.HowItWorks}>
        <p className={styles.sectionCaption}>How it Works</p>
        <h2 className={styles.sectionHeader}>It's as easy as...</h2>
      </section>

      <section className={styles.Features}>
        <p className={styles.sectionCaption}>Features</p>
        <h2 className={styles.sectionHeader}>Tools to get the job</h2>
      </section>

      <section className={styles.faq}>

      </section>

      <footer>
        
      </footer>
    </div>
  );
}

export default Landing;