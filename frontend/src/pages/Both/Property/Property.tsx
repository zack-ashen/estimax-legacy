import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import PMLayout from "../../../layouts/PMLayout/PMLayout";
import VendorLayout from "../../../layouts/VendorLayout/VendorLayout";
import { PropertyService } from "../../../services/propertyService";
import { Property as PropertyT, Role } from "../../../types";

import {
  ClockHistoryIcon,
  DataIcon,
  InfoIcon,
  PlusIcon,
  ToolIcon,
} from "../../../assets/icons";
import Button, { ButtonStyles } from "../../../components/Button/Button";
import Nib from "../../../components/Nib/Nib";
import TabBar from "../../../components/TabBar/TabBar";
import DetailsTab from "./DetailsTab/DetailsTab";
import styles from "./Property.module.scss";
import ProjectsTab from "./Tabs/ProjectsTab";

export default function Property() {
  const { id } = useParams();
  const {
    userDetails: { role },
  } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [property, setProperty] = useState<PropertyT | undefined>();

  useEffect(() => {
    PropertyService.get(id!).then((res) => {
      if (!res.error) {
        setProperty(res.property);
      }
    });
  }, [id]);

  const tabComponents = [
    {
      label: "Projects",
      Icon: ToolIcon,
      component: <ProjectsTab />,
    },
    {
      label: "History",
      component: <>Previously Used Vendors</>,
      Icon: ClockHistoryIcon,
    },
    {
      label: "Analytics",
      component: <>Analytics</>,
      Icon: DataIcon,
    },
    {
      label: "Property Details",
      component: property ? <DetailsTab property={property} /> : <></>,
      Icon: InfoIcon,
    },
  ];

  const TabComponent = tabComponents[selectedTab].component;

  return property ? (
    role === Role.VENDOR ? (
      <VendorLayout>
        <h1>Property {id} </h1>
      </VendorLayout>
    ) : (
      <PMLayout>
        <div className={styles.header}>
          <div className={styles.propertyInfo}>
            <p className={styles.SectionHeader}>{property?.name}</p>
            <div className={styles.address}>
              <p className={styles.addressLine}>
                {property.location.address.addressLine1}
              </p>
              <p className={styles.addressLine}>
                {property.location.address.addressLine2}
              </p>
            </div>
          </div>
          <Nib variant="primary" text={property.type} />
        </div>

        <div className={styles.tabSection}>
          <TabBar
            actionButton={
              <Button
                buttonStyle={ButtonStyles.PRIMARY}
                text="Create Project"
                RightIcon={PlusIcon}
                onClick={() => {
                  const queryParams = new URLSearchParams({ property: id! });
                  navigate({
                    pathname: `/create-project`,
                    search: queryParams.toString(),
                  });
                }}
              />
            }
            items={tabComponents}
            changeChildComp={(index) => setSelectedTab(index)}
          />

          {TabComponent}
        </div>
      </PMLayout>
    )
  ) : (
    <></>
  );
}
