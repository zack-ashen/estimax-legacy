import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterBar from "../../../components/FilterColumn/FilterBar";
import PMLayout from "../../../layouts/PMLayout/PMLayout";
import { VendorService } from "../../../services/vendorService";
import { Vendor } from "../../../types/vendor";
import vendorSearchFilters from "./Filters/Filters";

import VendorCard from "../../../components/Cards/VendorCard/VendorCard";
import styles from "./VendorSearch.module.scss";

export default function VendorSearch() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [page, setPage] = useState<number>(1);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramsObj: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      if (key === "services") {
        paramsObj[key] = value.split(",");
      } else paramsObj[key] = value;
    });

    setFilters(paramsObj);
  }, [location.search]);

  useEffect(() => {
    VendorService.search(filters, { page }).then((data) => {
      if (!data.vendors) {
        console.error("Error fetching vendors");
      } else setVendors(data.vendors);
    });
  }, [filters, page]);

  return (
    <PMLayout containerClassName={styles.container} pageTitle="Find Vendors">
      <FilterBar filters={vendorSearchFilters} />
      <div className={styles.vendorsContainer}>
        {vendors.map((vendor, index) => (
          <VendorCard key={index} vendor={vendor} />
        ))}
      </div>
    </PMLayout>
  );
}
