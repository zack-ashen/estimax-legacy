import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "./Form.module.scss";
import Button, { ButtonStyles } from "../../Button/Button";

// Define the types for your form fields
type FormValues = {
  // Example field: name: string;
};

type FormProps = {
  defaultValues: FormValues;
  children: React.ReactNode;
  submitButtonDetails: {
    text: string;
    action: SubmitHandler<FormValues>;
    wide?: boolean;
  };
  altButtonDetails?: {
    text: string;
    action: () => void;
    wide?: boolean;
  };
};

const Form: React.FC<FormProps> = ({
  defaultValues,
  children,
  submitButtonDetails,
  altButtonDetails,
}) => {
  const methods = useForm<FormValues>({ defaultValues });

  return (
    <form
      onSubmit={methods.handleSubmit(submitButtonDetails.action)}
      className={styles.Form}
    >
      {children}

      <div className={styles.actions}>
        {altButtonDetails && (
          <Button
            buttonStyle={ButtonStyles.SECONDARY}
            text={altButtonDetails.text}
            onClick={altButtonDetails.action}
            wide={altButtonDetails.wide}
          />
        )}
        <Button
          buttonStyle={ButtonStyles.PRIMARY}
          text={submitButtonDetails.text}
          type="submit"
          wide={submitButtonDetails.wide}
        />
      </div>
    </form>
  );
};

export default Form;
