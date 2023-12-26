import React, { ForwardedRef } from "react";
import IconBubble from "../../IconBubble/IconBubble";
import styles from "./MediaInput.module.scss";

import { ReactComponent as CloudUpload } from "../../../assets/icons/cloud_upload.svg";
import FileCard from "../../Cards/FileCard/FileCard";

interface MediaInputProps {
  id: string;
  label: string;
  onChange: (files: File[]) => void;
  value?: File[];
  error?: string;
  title?: string;
}

export const MediaInput = React.forwardRef(
  (
    { id, label, error, value, title, onChange }: MediaInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files ? Array.from(e.target.files) : [];
      const allFiles = (value || []).concat(fileList);
      onChange(allFiles);
    };

    const removeFile = (file: File) => {
      const filteredFiles = (value || []).filter(
        (currentFile) => currentFile !== file
      );
      onChange(filteredFiles);
    };

    console.log(value);

    return (
      <div className={styles.MediaInputContainer}>
        {title && (
          <p className={`${styles.inputLabel} ${styles.title}`}>{title}</p>
        )}
        <div className={styles.mediaInput}>
          <IconBubble Icon={CloudUpload} size="md" />
          <div className={styles.mediaInputTextContainer}>
            <p className={styles.mediaInputCTA}>Click to upload</p>
            <label htmlFor={id} className={styles.mediaInputLabel}>
              {label}
            </label>
          </div>
          <input
            type="file"
            id={id}
            className={styles.inputButton}
            onChange={handleFileChange}
            ref={ref}
            multiple
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        {value && value.length !== 0 && (
          <div className={styles.filesContainer}>
            {value.map((file, index) => (
              <FileCard
                name={file.name}
                size={file.size}
                type={file.type}
                key={index}
                onRemove={() => removeFile(file)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
