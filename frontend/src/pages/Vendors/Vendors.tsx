import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../../assets/icons";
import Button, { ButtonStyles } from "../../components/Button/Button";
import VendorCard from "../../components/Cards/VendorCard/VendorCard";
import {
  GridColumn,
  GridContainer,
  GridRow,
} from "../../components/GridLayout/GridLayout";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import PMLayout from "../../layouts/PMLayout/PMLayout";
import { OrganizationService } from "../../services/organizationService";
import { Vendor } from "../../types/vendor";
import styles from "./Vendors.module.scss";

export default function Vendors() {
  const {
    userDetails: { organization },
  } = useAuth();
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!organization) return navigate("/");

    OrganizationService.getVendors(organization).then((res) => {
      if (!res.error) {
        setVendors(res.vendors);
      }
    });
  }, [navigate, organization]);

  return (
    <PMLayout pageTitle="Favorite Vendors">
      <div className={styles.pageHeader}>
        <p className={styles.SectionHeader}>Favorite Vendors</p>
        <Button
          buttonStyle={ButtonStyles.PRIMARY}
          onClick={() => navigate("/vendor/search")}
          text={"Find Vendors"}
          RightIcon={SearchIcon}
        />
      </div>

      <GridContainer>
        <GridRow>
          {vendors?.map((vendor, ind) => (
            <GridColumn key={ind} xs={5}>
              <VendorCard key={ind} vendor={vendor} />
            </GridColumn>
          ))}
        </GridRow>
      </GridContainer>
    </PMLayout>
  );
}
