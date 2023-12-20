import FileCard from "../../../../components/Cards/FileCard/FileCard";
import { Property } from "../../../../types";
import styles from "./DetailsTab.module.scss";

interface DetailsTabProps {
  property: Property;
}

export default function DetailsTab({ property }: DetailsTabProps) {
  return (
    <div className={styles.DetailsTab}>
      <div className={styles.attachmentsSection}>
        <p className={styles.attachmentsSectionHeader}>Attachments</p>
        <div className={styles.attachments}>
          {property.media.map((attachment, index) => (
            <FileCard
              key={index}
              name={attachment.name}
              size={attachment.size}
              type={attachment.type}
              onClick={() => window.open(attachment.accessString, "_blank")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
