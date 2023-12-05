import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PMLayout from "../../components/Layouts/PMLayout/PMLayout";
import VendorLayout from "../../components/Layouts/VendorLayout/VendorLayout";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { PropertyService } from "../../services/propertyService";
import { Role } from "../../types";

export default function Property() {
  const { id } = useParams();
  const {
    userDetails: { role },
  } = useAuth();

  const [property, setProperty] = useState<any>({});

  useEffect(() => {
    PropertyService.get(id!).then((res) => {
      if (!res.error) {
        setProperty(res.property);
      }
    });
  }, [id]);

  return role === Role.VENDOR ? (
    <VendorLayout>
      <h1>Property {id} </h1>
    </VendorLayout>
  ) : (
    <PMLayout pageTitle="Property">
      <h1>{property.name}</h1>
      <h2>{property.type}</h2>
    </PMLayout>
  );
}
