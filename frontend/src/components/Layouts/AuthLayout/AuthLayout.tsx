import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import styles from "./AuthLayout.module.scss";
import Button, { ButtonStyles } from "../../Button/Button";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.AuthLayout}>
      <NavBar
        leftChild={<>Estimax</>}
        rightChild={
          <Button
            buttonStyle={ButtonStyles.SECONDARY}
            text={location.pathname === "/signin" ? "Sign Up" : "Sign In"}
            onClick={() =>
              location.pathname === "/signin"
                ? navigate("/signup")
                : navigate("/signin")
            }
          />
        }
      />
      <div className={styles.AuthContent}>{children}</div>
    </div>
  );
}
