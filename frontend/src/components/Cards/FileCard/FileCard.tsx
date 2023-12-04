import { ReactComponent as ImageFileIcon } from "../../../assets/icons/img_file.svg";
import { ReactComponent as PDFFileIcon } from "../../../assets/icons/pdf_file.svg";
import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg";

import Button, { ButtonStyles } from "../../Button/Button";
import styles from "./FileCard.module.scss";

interface FileCardProps {
  file: File;
  onRemove?: (file: File) => void;
}

export default function FileCard({ file, onRemove }: FileCardProps) {
  const formatFileSize = (file: File): string => {
    const bytes = file.size;
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;

    if (megabytes >= 1) {
      return `${megabytes.toFixed(2)} MB`;
    } else {
      return `${kilobytes.toFixed(2)} KB`;
    }
  };

  return (
    <div className={styles.FileCard}>
      <div className={styles.fileLeft}>
        {file.type !== "application/pdf" ? (
          <ImageFileIcon className={styles.Icon} />
        ) : (
          <PDFFileIcon className={styles.Icon} />
        )}
        <div className={styles.fileInfo}>
          <p className={styles.fileName}>{file.name}</p>
          <p className={styles.fileSize}>{formatFileSize(file)}</p>
        </div>
      </div>
      <div className={styles.fileRight}>
        {onRemove && (
          <Button
            buttonStyle={ButtonStyles.TERTIARY}
            Icon={TrashIcon}
            onClick={() => onRemove(file)}
          />
        )}
      </div>
    </div>
  );
}
