import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "../../../assets/icons";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import { OrganizationService } from "../../../services/organizationService";
import { Project } from "../../../types/project";
import { ppLengthOfTime } from "../../../utils/helpers";
import Table from "../Table/Table";
import { TableRow } from "../Table/types";

const projectsToTableData = (projects: Project[]): TableRow[] => {
  const tableData = projects.map((project) => {
    return {
      id: project.id,
      projectName: project.name,
      propertyName: "TODO",
      numberOfBids: "TODO",
      bidTimeRemaining: ppLengthOfTime(
        new Date(project.expirationDate).getTime() - new Date().getTime()
      ),
      projectStartDate: "TODO",
    };
  });

  return tableData.map((row) => [
    { content: <b>{row.projectName}</b> },
    { content: row.propertyName },
    { content: row.numberOfBids },
    { content: row.bidTimeRemaining },
    { content: row.projectStartDate },
  ]);
};

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

  const TABLE_COLS = [
    { name: "Project Name" },
    { name: "Property Name" },
    { name: "Number of Bids" },
    { name: "Bid Time Remaining" },
    { name: "Project Start Date" },
  ];

  return (
    <Table
      header={TABLE_HEADER}
      data={tableData}
      columns={TABLE_COLS}
      pageSize={3}
    />
  );
}
