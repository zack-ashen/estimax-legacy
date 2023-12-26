import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import PMLayout from "../../../layouts/PMLayout/PMLayout";
import VendorLayout from "../../../layouts/VendorLayout/VendorLayout";
import { ProjectService } from "../../../services/projectService";
import { Project as ProjectT, Role } from "../../../types";

import { AttachmentsIcon, DocumentIcon, InfoIcon } from "../../../assets/icons";
import Button, { ButtonStyles } from "../../../components/Button/Button";
import Drawer from "../../../components/Drawer/Drawer";
import PlaceBidForm from "../../../components/Forms/PlaceBidForm/PlaceBidForm";
import Nib from "../../../components/Nib/Nib";
import TabBar from "../../../components/TabBar/TabBar";
import { calcBidUrgency, timeLeftToBidString } from "../../../utils/helpers";
import styles from "./Project.module.scss";

export default function Project() {
  const { id } = useParams();
  const {
    userDetails: { role },
  } = useAuth();

  const [project, setProject] = useState<ProjectT | undefined>();
  const [endTime, setEndTime] = useState<number>(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    ProjectService.get(id!).then((res) => {
      if (!res.error) {
        setProject(res.project);
        setEndTime(new Date(res.project.expirationDate).getTime());
      }
    });
  }, [id]);

  return project ? (
    role === Role.VENDOR ? (
      <VendorLayout>
        <div className={styles.Header}>
          <div className={styles.leftHeaderContainer}>
            <p className={styles.SectionHeader}>{project.name}</p>
            <p className={styles.SectionSubtitle}>
              Project location placeholder
            </p>
          </div>
          <div className={styles.rightHeaderContainer}>
            <Nib
              variant={calcBidUrgency(endTime)}
              text={`${timeLeftToBidString(endTime)} Left to Bid`}
            />
          </div>
        </div>
        <Button
          buttonStyle={ButtonStyles.PRIMARY}
          onClick={() => setIsDrawerOpen(true)}
          text="Place Bid"
        />
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          header="Place Bid"
        >
          <PlaceBidForm />
        </Drawer>
      </VendorLayout>
    ) : (
      <PMLayout>
        <div className={styles.Header}>
          <div className={styles.leftHeaderContainer}>
            <p className={styles.SectionHeader}>{project.name}</p>
            <p className={styles.SectionSubtitle}>{project.property.name}</p>
          </div>
          <div className={styles.rightHeaderContainer}>
            <Nib
              variant={calcBidUrgency(endTime)}
              text={`${timeLeftToBidString(endTime)} Left to Bid`}
            />
          </div>
        </div>
        <div className={styles.Content}>
          <TabBar
            items={[
              {
                label: "Project Scope",
                Icon: DocumentIcon,
              },
              {
                label: "Attachments",
                Icon: AttachmentsIcon,
              },
              {
                label: "More Details",
                Icon: InfoIcon,
              },
            ]}
            changeChildComp={() => {}}
          />

          <p>Quote Manager</p>
        </div>
      </PMLayout>
    )
  ) : (
    <></>
  );
}
