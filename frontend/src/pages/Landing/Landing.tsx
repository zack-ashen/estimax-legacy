import Button, { ButtonStyles } from "../../components/Button/Button";
import { GridContainer } from "../../components/GridLayout/GridLayout";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./Landing.module.scss";

import { useNavigate } from "react-router-dom";

const LandingNavLinks = (
  <div className={styles.landingLinks}>
    <Button buttonStyle={ButtonStyles.LINK} text="How it Works" />
    <Button buttonStyle={ButtonStyles.LINK} text="Features" />
    <Button buttonStyle={ButtonStyles.LINK} text="Pricing" />
    <Button buttonStyle={ButtonStyles.LINK} text="FAQ" />
  </div>
);

const AuthButtons = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        buttonStyle={ButtonStyles.SECONDARY}
        text="Sign In"
        onClick={() => navigate("/signin")}
      />
      <Button
        buttonStyle={ButtonStyles.PRIMARY}
        text="Sign Up"
        onClick={() => navigate("/signup")}
      />
    </>
  );
};

function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.Landing}>
      <NavBar
        leftChild={<>Estimax</>}
        middleChild={LandingNavLinks}
        rightChild={<AuthButtons />}
      />
      <GridContainer></GridContainer>
    </div>
  );
}

export default Landing;
