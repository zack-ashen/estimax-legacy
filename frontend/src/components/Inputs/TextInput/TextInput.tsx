import React, {
  ChangeEvent,
  FunctionComponent,
  SVGProps,
  ForwardedRef,
  useState,
} from "react";
import styles from "./TextInput.module.scss";

// Define the prop types
interface TextInputProps {
  id: string;
  label?: string;
  value?: string;
  error?: string;
  [key: string]: any; // for additional props like 'placeholder', 'type', etc.
}

const TextInput = React.forwardRef(
  (
    { label, error, ...props }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const inputClassName = error
      ? `${styles.Input} ${styles.error}`
      : styles.Input;

    return (
      <div className={`${styles.textInputContainer} ${styles.inputContainer}`}>
        {label && (
          <label htmlFor={props.id} className={styles.inputLabel}>
            {label}
          </label>
        )}
        <input {...props} ref={ref} className={inputClassName} />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

export default TextInput;
