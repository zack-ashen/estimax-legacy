import { useParams } from "react-router-dom";
import PropertyProjectsTable from "../../../../components/Tables/PropertyProjectsTable/PropertyProjectsTable";

export default function ProjectsTab() {
  const { id } = useParams();

  return id ? <PropertyProjectsTable propertyId={id} /> : <></>;
}
