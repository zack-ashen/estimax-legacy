import React, { ForwardedRef } from "react";
import styles from "./TextInput.module.scss";

interface TextInputProps {
  id: string;
  label?: string;
  value?: string;
  error?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  [key: string]: any; // for additional props like 'placeholder', 'type', etc.
}

const TextInput = React.forwardRef(
  (
    { id, label, error, value, Icon, ...props }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const inputClassName = error
      ? `${styles.Input} ${styles.error}`
      : styles.Input;

    return (
      <div className={`${styles.textInputContainer} ${styles.inputContainer}`}>
        {label && (
          <label htmlFor={id} className={styles.inputLabel}>
            {label}
          </label>
        )}
        <input
          {...props}
          id={id}
          ref={ref}
          value={value}
          {...props}
          className={inputClassName}
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

export default TextInput;
