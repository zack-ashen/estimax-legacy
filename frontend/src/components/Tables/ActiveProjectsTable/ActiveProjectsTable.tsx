import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "../../../assets/icons";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { OrganizationService } from "../../../services/organizationService";
import Table from "../Table/Table";
import { TableRow } from "../Table/types";
import { PROJECT_TABLE_COLS, projectsToTableData } from "../helpers";

export default function ActiveProjectsTable() {
  const {
    userDetails: { organization },
  } = useAuth();
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    OrganizationService.getProjects(organization!).then((res) => {
      if (res.projects) {
        setTableData(projectsToTableData(res.projects));
      }
    });
  }, [organization]);

  const TABLE_HEADER = {
    title: "Active Projects",
    buttonLabel: "Add Project",
    buttonIcon: PlusIcon,
    onButtonClick: () => navigate("/create-project"),
  };

  return (
    <Table
      header={TABLE_HEADER}
      data={tableData}
      columns={PROJECT_TABLE_COLS}
      pageSize={3}
    />
  );
}
