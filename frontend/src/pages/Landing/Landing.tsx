import Button, { ButtonStyles } from "../../components/Button/Button";
import {
  GridColumn,
  GridContainer,
  GridRow,
} from "../../components/GridLayout/GridLayout";
import NavBar from "../../components/NavBar/NavBar";
import NavLinks from "../../components/NavLinks/NavLinks";
import styles from "./Landing.module.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingNavLinks = (
  <NavLinks
    links={[
      { name: "Home", route: "/" },
      { name: "About", route: "/about" },
      { name: "Contact", route: "/contact" },
    ]}
  />
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
