import { useNavigate } from "react-router-dom";
import Button, { ButtonStyles } from "../../components/Button/Button";
import PMLayout from "../../layouts/PMLayout/PMLayout";

import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";

import { useEffect, useState } from "react";
import PropertyCard from "../../components/Cards/PropertyCard/PropertyCard";
import { GridContainer } from "../../components/GridLayout/GridLayout";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { OrganizationService } from "../../services/organizationService";
import { Property } from "../../types";
import styles from "./Properties.module.scss";

export default function Properties() {
  const {
    userDetails: { organization },
  } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!organization) return navigate("/");

    OrganizationService.getProperties(organization).then((res) => {
      if (!res.error) {
        setProperties(res.properties);
      }
    });
  }, [navigate, organization]);

  return (
    <PMLayout pageTitle="My Properties">
      <div className={styles.pageHeader}>
        <p className={styles.SectionHeader}>Properties</p>
        <Button
          buttonStyle={ButtonStyles.PRIMARY}
          onClick={() => navigate("/create-property")}
          text={"Create Property"}
          RightIcon={PlusIcon}
        />
      </div>

      <GridContainer>
        {properties?.map((property, ind) => (
          <PropertyCard key={ind} property={property} />
        ))}
      </GridContainer>
    </PMLayout>
  );
}
