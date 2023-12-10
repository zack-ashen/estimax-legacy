import { useEffect, useState } from "react";
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

  useEffect(() => {
    PropertyService.getProjects(propertyId).then((res) => {
      if (res.projects) {
        setTableData(projectsToTableData(res.projects));
      }
    });
  }, [propertyId]);

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
