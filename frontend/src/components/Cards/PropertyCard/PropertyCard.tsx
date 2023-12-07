import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyService } from "../../../services/propertyService";
import { Property } from "../../../types";
import Nib from "../../Nib/Nib";
import styles from "./PropertyCard.module.scss";

interface PropCardWId {
  id: string;
  property?: never;
}

interface PropCardWProp {
  id?: never;
  property: Property;
}

type PropertyCardProps = PropCardWId | PropCardWProp;

export default function PropertyCard({ id, property }: PropertyCardProps) {
  const navigate = useNavigate();

  const [propertyObj, setPropertyObj] = useState<Property | undefined>(
    property
  );

  useEffect(() => {
    if (!property) {
      PropertyService.get(id).then((res) => {
        if (!res.error) {
          setPropertyObj(res.property);
        }
      });
    }
  }, [id, property]);

  return propertyObj ? (
    <div
      className={styles.PropertyCard}
      onClick={() => navigate(`/property/${propertyObj.id}`)}
    >
      <div className={styles.leftContainer}>
        <p className={styles.title}>{propertyObj.name}</p>
        <p className={styles.addressLine}>
          {propertyObj.location.address.addressLine1}
        </p>
        <p className={styles.addressLine}>
          {propertyObj.location.address.addressLine2}
        </p>
      </div>
      <div className={styles.rightContainer}>
        <Nib
          variant="primary"
          text={propertyObj.projects.length.toString() + " Projects"}
        />
        <Nib
          variant="green"
          text={
            propertyObj.activeProjects.length.toString() + " Active Projects"
          }
        />
      </div>
    </div>
  ) : (
    <></>
  );
}
