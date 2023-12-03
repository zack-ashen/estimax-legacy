import React, { ForwardedRef } from "react";

import styles from "./TextArea.module.scss";

interface TextAreaProps {
  id: string;
  label?: string;
  value?: string;
  error?: string;
  [key: string]: any;
}

const TextArea = React.forwardRef(
  (
    { label, error, ...props }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    const textAreaClassName = error
      ? `${styles.TextArea} ${styles.error}`
      : styles.TextArea;

    return (
      <div className={styles.textAreaContainer}>
        {label && (
          <label htmlFor={props.id} className={styles.textAreaLabel}>
            {label}
          </label>
        )}
        <textarea {...props} ref={ref} className={textAreaClassName} />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

export default TextArea;
