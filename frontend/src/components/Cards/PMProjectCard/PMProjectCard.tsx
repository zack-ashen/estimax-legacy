import { useEffect, useState } from "react";
import { ProjectService } from "../../../services/projectService";
import { Project } from "../../../types/project";
import { calcBidUrgency, timeLeftToBidString } from "../../../utils/helpers";
import MoreOptions from "../../MoreOptions/MoreOptions";
import Nib from "../../Nib/Nib";
import styles from "./PMProjectCard.module.scss";

interface PMProjectCardWId {
  id: string;
  project?: never;
}

interface PMProjectCardWProject {
  id?: never;
  project: Project;
}

type PMProjectCardProps = PMProjectCardWId | PMProjectCardWProject;

export default function PMProjectCard({
  id,
  project: projectP,
}: PMProjectCardProps) {
  const [project, setProject] = useState<Project | undefined>(projectP);
  const [endTime, setEndTime] = useState<number>(0);

  useEffect(() => {
    if (id) {
      ProjectService.get(id).then((res) => {
        if (!res.error) {
          setProject(res.project);
          setEndTime(new Date(res.project.expirationDate).getTime());
        }
      });
    }
  }, [id]);

  return project ? (
    <div className={styles.PMProjectCard}>
      <div className={styles.projectInfo}>
        <p className={styles.projectName}>
          {project.status === "In Progress" ? (
            <span className={styles.activeIndicator}>●</span>
          ) : (
            <></>
          )}{" "}
          {project.name}
        </p>
        <MoreOptions />
      </div>
      <div className={styles.projectDetails}>
        <div className={styles.bidDetails}>
          <p>{project.bids.length} Bids</p>
          <p className={styles.projectStatusText}>
            Lowest Bid • ${project.lowestBid ? project.lowestBid : "0"}
          </p>
        </div>
        <Nib
          variant={calcBidUrgency(endTime)}
          text={`Ends in ${timeLeftToBidString(endTime)}`}
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
