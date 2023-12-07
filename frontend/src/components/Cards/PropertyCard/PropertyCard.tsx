import { useEffect, useState } from "react";
import { PropertyService } from "../../../services/propertyService";
import { Property } from "../../../types";
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

  return property ? (
    <div className={styles.PropertyCard}>
      PropertyCard <p>{property.name}</p>
    </div>
  ) : (
    <></>
  );
}
