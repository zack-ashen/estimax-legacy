import { ReactComponent as ImageFileIcon } from "../../../assets/icons/img_file.svg";
import { ReactComponent as PDFFileIcon } from "../../../assets/icons/pdf_file.svg";
import { ReactComponent as TrashIcon } from "../../../assets/icons/trash.svg";

import Button, { ButtonStyles } from "../../Button/Button";
import styles from "./FileCard.module.scss";

interface FileCardProps {
  name: string;
  size: number;
  type: string;
  onClick?: () => void;
  onRemove?: () => void;
}

export default function FileCard({
  name,
  size,
  type,
  onClick,
  onRemove,
}: FileCardProps) {
  const formattedSize = () => {
    const bytes = size;
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;

    if (megabytes >= 1) {
      return `${megabytes.toFixed(2)} MB`;
    } else {
      return `${kilobytes.toFixed(2)} KB`;
    }
  };

  return (
    <div
      className={`${styles.FileCard} ${styles[onClick ? "clickable" : ""]}`}
      onClick={onClick}
    >
      <div className={styles.fileLeft}>
        {type !== "application/pdf" ? (
          <ImageFileIcon className={styles.Icon} />
        ) : (
          <PDFFileIcon className={styles.Icon} />
        )}
        <div className={styles.fileInfo}>
          <p className={styles.fileName}>{name}</p>
          <p className={styles.fileSize}>{formattedSize()}</p>
        </div>
      </div>
      <div className={styles.fileRight}>
        {onRemove && (
          <Button
            buttonStyle={ButtonStyles.TERTIARY}
            LeftIcon={TrashIcon}
            onClick={() => onRemove()}
          />
        )}
      </div>
    </div>
  );
}
