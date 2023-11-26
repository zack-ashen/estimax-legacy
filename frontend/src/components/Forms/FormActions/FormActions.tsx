import Button, { ButtonStyles } from "../../Button/Button";

import styles from "./FormActions.module.scss";

export interface ActionButton {
  text: string;
  action?: () => void;
  wide?: boolean;
}

interface FormActionsProps {
  submitButtonDetails: ActionButton;
  altButtonDetails?: ActionButton;
}
export default function FormActions({
  submitButtonDetails,
  altButtonDetails,
}: FormActionsProps) {
  return (
    <div className={styles.actions}>
      {altButtonDetails && (
        <Button
          buttonStyle={ButtonStyles.SECONDARY}
          text={altButtonDetails.text}
          onClick={(e) => {
            e.preventDefault();
            altButtonDetails.action && altButtonDetails.action();
          }}
          wide={altButtonDetails.wide}
        />
      )}
      <Button
        buttonStyle={ButtonStyles.PRIMARY}
        text={submitButtonDetails.text}
        wide={submitButtonDetails.wide}
        type={"submit"}
      />
    </div>
  );
}
