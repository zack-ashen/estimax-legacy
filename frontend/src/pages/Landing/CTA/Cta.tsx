
import styles from "./Cta.module.scss";
import Button, { ButtonStyles } from "../../../components/Button/Button";
import { Copy } from "../copy";

export default function Cta() {

  return (
    <div className={styles.container}>
        <h3>{Copy.cta}</h3>
        <Button 
          buttonStyle={ButtonStyles.PRIMARY}
          text="Get started"
          onClick={() => {}}
        />
    </div>
  );
}