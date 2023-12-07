import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import PMLayout from "../../layouts/PMLayout/PMLayout";
import VendorLayout from "../../layouts/VendorLayout/VendorLayout";
import { PropertyService } from "../../services/propertyService";
import { Property as PropertyT, Role } from "../../types";

import Nib from "../../components/Nib/Nib";
import styles from "./Property.module.scss";

export default function Property() {
  const { id } = useParams();
  const {
    userDetails: { role },
  } = useAuth();

  const [property, setProperty] = useState<PropertyT | undefined>();

  useEffect(() => {
    PropertyService.get(id!).then((res) => {
      if (!res.error) {
        setProperty(res.property);
      }
    });
  }, [id]);

  return property ? (
    role === Role.VENDOR ? (
      <VendorLayout>
        <h1>Property {id} </h1>
      </VendorLayout>
    ) : (
      <PMLayout pageTitle="Property">
        <p className={styles.SectionHeader}>{property?.name}</p>
        <div className={styles.address}>
          <p className={styles.addressLine}>
            {property.location.address.addressLine1}
          </p>
          <p className={styles.addressLine}>
            {property.location.address.addressLine2}
          </p>
        </div>
        <Nib variant="primary" text={property.type} />
      </PMLayout>
    )
  ) : (
    <></>
  );
}
