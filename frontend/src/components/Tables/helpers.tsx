import { Project } from "../../types";
import { ppLengthOfTime } from "../../utils/helpers";
import { TableRow } from "./Table/types";

export const projectsToTableData = (
  projects: Project[],
  navigate: (path: string) => void
): TableRow[] => {
  const tableData = projects.map((project) => {
    return {
      id: project.id,
      projectName: project.name,
      propertyName: project.property.name,
      numberOfBids: project.bids.length,
      bidTimeRemaining: ppLengthOfTime(
        new Date(project.expirationDate).getTime() - new Date().getTime()
      ),
      invitedVendors: project.invitedVendors.length,
    };
  });

  const rows = tableData.map((row) => {
    return {
      onClick: () => navigate(`/project/${row.id}`),
      cells: [
        { content: <b>{row.projectName}</b> },
        { content: row.propertyName },
        { content: row.numberOfBids },
        { content: row.bidTimeRemaining },
        { content: row.invitedVendors },
      ],
    };
  });

  return rows;
};

export const PROJECT_TABLE_COLS = [
  { name: "Project Name" },
  { name: "Property Name" },
  { name: "Number of Bids" },
  { name: "Bid Time Remaining" },
  { name: "Invited Vendors" },
];
