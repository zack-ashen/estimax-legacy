import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookmarkIcon } from "../../../assets/icons";
import { Vendor } from "../../../types/vendor";
import Button, { ButtonStyles } from "../../Button/Button";
import Nib from "../../Nib/Nib";
import styles from "./VendorCard.module.scss";

interface VendorCardProps {
  vendor: Vendor;
}

export default function VendorCard({ vendor }: VendorCardProps) {
  const navigate = useNavigate();

  const [vendorObj, setVendorObj] = useState<Vendor | undefined>(vendor);

  // TODO: actually call the vendor service and change this
  // useEffect(() => {
  //   if (!property) {
  //     PropertyService.get(id).then((res) => {
  //       if (!res.error) {
  //         setPropertyObj(res.property);
  //       }
  //     });
  //   }
  // }, [id, property]);

  // return vendorObj ? (
  return (
    <div
      className={styles.VendorCard}
      // onClick={() => navigate(`/vendor/${vendorObj.id}`)}
    >
      <div className={styles.topContainer}>
        <div className={styles.vendorTextContainer}>
          <p className={styles.vendorName}>Mohammed's Missile Co.</p>
          <p className={styles.vendorLocation}>Gaza City, Gaza</p>
        </div>
        <div>
          <Button
            buttonStyle={ButtonStyles.TERTIARY}
            LeftIcon={BookmarkIcon}
            iconOnly
          />
        </div>
      </div>
      <div className={styles.servicesContainer}>
        <Nib variant="primary" text="Service 1" />
        <Nib variant="primary" text="Service 2" />
      </div>
    </div>
    // ) : (
    //   <></>
  );
}
