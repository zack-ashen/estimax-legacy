import { useLocation, useNavigate } from "react-router-dom";
import Button, { ButtonStyles } from "../../components/Button/Button";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./AuthLayout.module.scss";

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
