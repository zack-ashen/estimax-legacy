import { Project } from "../../types";
import { ppLengthOfTime } from "../../utils/helpers";
import { TableRow } from "./Table/types";

export const projectsToTableData = (projects: Project[]): TableRow[] => {
  const tableData = projects.map((project) => {
    return {
      id: `projects/${project.id}`,
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

export const PROJECT_TABLE_COLS = [
  { name: "Project Name" },
  { name: "Property Name" },
  { name: "Number of Bids" },
  { name: "Bid Time Remaining" },
  { name: "Project Start Date" },
];
