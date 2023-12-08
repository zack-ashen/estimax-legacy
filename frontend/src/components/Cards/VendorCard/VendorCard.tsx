import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./VendorCard.module.scss";
import { Vendor } from "../../../types/vendor";
import { BookmarkIcon } from "../../../assets/icons";
import Nib from "../../Nib/Nib";
import Button, { ButtonStyles } from "../../Button/Button";

interface VendorCardProps {
  id?: string;
  vendor?: Vendor;
}

export default function VendorCard({ id, vendor }: VendorCardProps) {
  const navigate = useNavigate();

  const [vendorObj, setVendorObj] = useState<Vendor | undefined>(
    vendor
  );

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
  return  (
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
          <button 
            className={styles.saveButton}
            // onClick={} save the vendor
          >
            {<BookmarkIcon className={styles.saveIcon} />}
          </button>
          {/* <Button 
            buttonStyle={ButtonStyles.TERTIARY}
            LeftIcon={BookmarkIcon}
          /> */}
        </div>
      </div>
      <div className={styles.servicesContainer}>
        <Nib 
          variant="primary"
          text="Service 1"
        />
        <Nib 
          variant="primary"
          text="Service 2"
        />
      </div>
    </div>
  // ) : (
  //   <></>
  );
}
