import React, { ForwardedRef } from "react";
import styles from "./MediaInput.module.scss";

interface MediaInputProps {
  id: string;
  label: string;
  error?: string;
}

export const MediaInput = React.forwardRef(
  (
    { id, label, error }: MediaInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={styles.MediaInputContainer}>
        <div className={styles.mediaInput}>
          <p>Icon Placeholder</p>
          <div className={styles.mediaInputTextContainer}>
            <p className={styles.mediaInputCTA}>Click to upload</p>
            <label htmlFor={id} className={styles.mediaInputLabel}>
              {label}
            </label>
          </div>
          <input type="file" id="media-input" className={styles.inputButton} />
        </div>
      </div>
    );
  }
);
