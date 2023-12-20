import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyService } from "../../../services/propertyService";
import Table from "../Table/Table";
import { TableRow } from "../Table/types";
import { PROJECT_TABLE_COLS, projectsToTableData } from "../helpers";

interface PropertyProjectsTableProps {
  propertyId: string;
}

export default function PropertyProjectsTable({
  propertyId,
}: PropertyProjectsTableProps) {
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    PropertyService.getProjects(propertyId).then((res) => {
      if (res.projects) {
        setTableData(projectsToTableData(res.projects, navigate));
      }
    });
  }, [propertyId, navigate]);

  const filters = [
    {
      label: "Active",
      logic: () => true,
    },
    {
      label: "Previous",
      logic: () => true,
    },
    {
      label: "Drafts",
      logic: () => true,
    },
  ];

  return (
    <Table
      filters={filters}
      data={tableData}
      columns={PROJECT_TABLE_COLS}
      pageSize={8}
    />
  );
}
