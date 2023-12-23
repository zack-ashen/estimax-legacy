import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterBar from "../../../components/FilterColumn/FilterBar";
import PMLayout from "../../../layouts/PMLayout/PMLayout";
import { VendorService } from "../../../services/vendorService";
import { Vendor } from "../../../types/vendor";
import vendorSearchFilters from "./Filters/Filters";

export default function VendorSearch() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState<number>(1);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
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
    <PMLayout>
      <FilterBar filters={vendorSearchFilters} />
      <div>Vendor Search</div>
    </PMLayout>
  );
}
