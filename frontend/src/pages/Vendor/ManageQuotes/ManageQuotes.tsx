import { useEffect, useState } from "react";
import VendorLayout from "../../../layouts/VendorLayout/VendorLayout";
import { Bid } from "../../../types";

import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { VendorService } from "../../../services/vendorService";
import styles from "./ManageQuotes.module.scss";

export default function ManageQuotes() {
  const {
    userDetails: { id },
  } = useAuth();
  const [quotes, setQuotes] = useState<Bid[]>([]);

  useEffect(() => {
    VendorService.bids(id).then((data) => {
      if (!data.bids) {
        console.error("Error fetching bids");
      } else setQuotes(data.bids);
    });
  }, [id]);

  return (
    <VendorLayout>
      <p className={styles.SectionHeader}>Manage Quotes</p>
    </VendorLayout>
  );
}
