import { useNavigate } from "react-router-dom";
import { BookmarkIcon } from "../../../assets/icons";
import { Project } from "../../../types/project";
import { calcBidUrgency, timeLeftToBidString } from "../../../utils/helpers";
import Button, { ButtonStyles } from "../../Button/Button";
import Nib from "../../Nib/Nib";
import styles from "./VendorProjectCard.module.scss";

interface VendorProjectCardProps {
  project: Project;
}

export default function VendorProjectCard({ project }: VendorProjectCardProps) {
  const navigate = useNavigate();
  const endTime = new Date(project.expirationDate).getTime();

  return (
    <div
      className={styles.VendorProjectCard}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <p className={styles.name}>{project.name}</p>
          <p className={styles.address}>Address placeholder</p>
        </div>
        <div className={styles.headerRight}>
          <Button
            buttonStyle={ButtonStyles.TERTIARY}
            LeftIcon={BookmarkIcon}
            iconOnly
          />
        </div>
      </div>
      <div className={styles.divider} />
      <p className={styles.description}>{project?.description}</p>
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.bidDetails}>
            <p>{project.bids.length} Bids</p>
            <p className={styles.projectStatus}>
              Lowest Bid • ${project.lowestBid ? project.lowestBid : "0"}
            </p>
          </div>
        </div>
        <div className={styles.footerRight}>
          <Nib
            variant={calcBidUrgency(endTime)}
            text={`Ends in ${timeLeftToBidString(endTime)}`}
          />
          <p className={styles.poster}>Poster placeholder</p>
        </div>
      </div>
    </div>
  );
}
