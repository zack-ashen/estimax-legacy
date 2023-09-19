import styles from './Landing.module.scss';
import { ReactComponent as DecorativeGrid } from '../../assets/DecorativeGrid.svg'
import { ReactComponent as Logo } from '../../assets/Logo.svg'
import Button, { ButtonStyles } from '../../components/Inputs/Button/Button';
import HeroImage from '../../assets/HeroImage.png';
import HandymanImage from '../../assets/handyman.jpeg';
import { ContractorCopy, HomeownerCopy } from './copy';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout, { PageSizes } from '../../components/AppLayout/AppLayout';



interface HowItWorksToggleProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  header: string;
  description: string;
  setToggled: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  toggled?: boolean;

}

const HowItWorksToggle = ({ Icon, header, description, toggled, setToggled, index } : HowItWorksToggleProps) => toggled ? (
  <div className={styles.stepToggled}>
    <Icon className={styles.stepIcon} />
    <div className={styles.stepTextContainer}>
      <h3>{header}</h3>
      <p className={styles.stepText}>{description}</p>
    </div>
  </div>
) : (
  <div className={styles.stepNotToggled} onClick={() => setToggled(index)}>
    <Icon className={styles.stepIcon} />
    <h3>{header}</h3>
  </div>
)



function Landing() {
  const [ userType, setUserType ] = useState(HomeownerCopy)
  const [ toggled, setToggled ] = useState(1);
  const navigate = useNavigate();

  return (
    <AppLayout maxWidth={PageSizes.LARGE}>
    <div className={styles.Landing}>
      {/* <DecorativeGrid className={styles.decorativeGridLeft} /> */}
      <div className={styles.heroSectionContainer}>
        <DecorativeGrid className={styles.decorativeGridRight} />
        <div className={styles.heroSection}>
          <div className={styles.heroLeft}>
            <div className={styles.textContent}>
              <h1 className={styles.heroHeader}>Get a fair price from your favorite pros.</h1>
              <p className={styles.heroSubtitle}>We connect service-providers to homeowners through an open bidding platform. Making free, high quality lead generation as easy as scrolling and bidding. </p>
            </div>
            <Button buttonStyle={ButtonStyles.PRIMARY} text={'Get Started'} onClick={() => navigate('/signup')}/>
          </div>
          <div className={styles.heroRight}>
            <div></div>
            <img src={HeroImage} alt={'hero'} className={styles.heroImage}/>
          </div>
        </div>

        <div className={styles.userTypeSelect}>
          <h2>Who are you?</h2>
          <div className={styles.userTypeToggleContainer}>
            <button 
              className={`${styles.toggleButton} ${styles[userType === HomeownerCopy ? 'toggled' :'']}`} 
              onClick={() => setUserType(HomeownerCopy)} 
              disabled={userType === HomeownerCopy}>I'm a Homeowner</button>
            <button 
              className={`${styles.toggleButton} ${styles[userType === ContractorCopy ? 'toggled' :'']}`} 
              onClick={() => setUserType(ContractorCopy)} 
              disabled={userType === ContractorCopy}>I'm a Service Provider</button>
          </div>
        </div>
      </div>

      <div className={styles.sectionsContainer}>
        <section className={styles.landingSection}>
          <p className={styles.sectionCaption} id='how-it-works'>How it Works</p>
          <h2 className={styles.sectionHeader}>It's as easy as...</h2>

          <div className={styles.howItWorksTwoColumn}>
            <div className={styles.howItWorksLeft}>
              {/* <div className={styles.stepToggled}>
                <PencilIcon className={styles.stepIcon} />
                <div className={styles.stepTextContainer}>
                  <h3>Snap</h3>
                  <p className={styles.stepText}>Bring together your internal teams and external partners for cleaner closes.</p>
                </div>
              </div> */}
              {userType.howItWorksFlow.map((step, index) => (
                <HowItWorksToggle 
                  Icon={step.Icon} 
                  header={step.title} 
                  description={step.body} 
                  toggled={toggled === index} 
                  setToggled={setToggled} 
                  index={index} 
                  key={index} />
              ))}
            </div>
            <div className={styles.howItWorksRight}>
                <img src={userType.howItWorksFlow[toggled].image} alt={'how it works'} className={styles.howItWorksImage}/>
            </div>
          </div>
        </section>

        <section className={`${styles.landingSection} ${styles.calloutSection}`}>
          <div className={styles.leftCallout}>
            <h1>Get a <span className={styles.callout}>fair price</span> everytime.</h1>
            <p>No more having to deal with not knowing whether the price a contractor is offering you is actually a fair price. 
              On Estimax, multiple service providers bid against each other and legitimatize their bid with descriptions of the work they will provide.</p>
          </div>
          <div className={styles.rightCallout}>
            <img src={HandymanImage} className={styles.handymanImage} alt={'handyman'}/>
          </div>
        </section>

        <section className={styles.landingSection} id='features'>
          <p className={styles.sectionCaption}>Features</p>
          <h2 className={styles.sectionHeader}>Tools to get the job</h2>

          <div className={styles.featureContainer}>
            {userType.featureFlow.map((feature, index) => {
              const Icon = feature.Icon;
              return (
              <div className={styles.feature} key={index}>
                <div className={styles.featureIconContainer}>
                    <Icon className={styles.featureIcon} />
                </div>
                <div className={styles.featureTextContainer}>
                    <p className={styles.featureHeader}>{feature.title}</p>
                    <p className={styles.featureBody}>{feature.body}</p>
                </div>
              </div>
            )})}
          </div>
        </section>

        <section className={styles.faq} id='faq'>

        </section>

      </div>
      <section className={`${styles.finalCallToAction}`}>
          <div className={styles.finalCTATextContainer}>
            <h1 className={styles.finallCTAHeader}>Start getting leads</h1>
            <p className={styles.finallCTASubtitle}>Sign up now to start getting free leads and bid on your favorite projects.</p>
          </div>
          <Button buttonStyle={ButtonStyles.PRIMARY} text={'Get Started'} onClick={() => navigate('/signup')}/>
      </section>
      <footer>
          <Logo />
          <p>Copyright © 2023 Estimax Inc. All rights reserved.</p>
      </footer>
    </div>
    </AppLayout>
  );
}

export default Landing;