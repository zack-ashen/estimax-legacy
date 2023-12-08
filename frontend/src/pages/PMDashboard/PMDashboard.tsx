import { useNavigate } from "react-router-dom";
import Button, { ButtonStyles } from "../../components/Button/Button";
import PMLayout from "../../layouts/PMLayout/PMLayout";

import { MetricCard } from "../../components/Cards/MetricCard/MetricCard";
import styles from "./PMDashboard.module.scss";

import { ReactComponent as BuildingIcon } from "../../assets/icons/building.svg";
import Nib from "../../components/Nib/Nib";
import Table from "../../components/Tables/Table/Table";

export default function PMDashboard() {
  const mockTableData = [
    {
      id: 1,
      boldText: "Bold Text 1",
      regularText: "Regular Text 1",
      buttonText: "Button 1",
    },
    {
      id: 2,
      boldText: "Bold Text 2",
      regularText: "Regular Text 2",
      buttonText: "Button 2",
    },
    {
      id: 3,
      boldText: "Bold Text 3",
      regularText: "Regular Text 3",
      buttonText: "Button 3",
    },
    {
      id: 4,
      boldText: "Bold Text 4",
      regularText: "Regular Text 4",
      buttonText: "Button 4",
    },
    {
      id: 5,
      boldText: "Bold Text 5",
      regularText: "Regular Text 5",
      buttonText: "Button 5",
    },
    {
      id: 6,
      boldText: "Bold Text 6",
      regularText: "Regular Text 6",
      buttonText: "Button 6",
    },
    {
      id: 7,
      boldText: "Bold Text 7",
      regularText: "Regular Text 7",
      buttonText: "Button 7",
    },
  ];

  const handleButtonClick = (id: number) => {
    console.log("Button clicked on row:", id);
  };

  const tableData = mockTableData.map((row) => [
    { content: <b>{row.boldText}</b>, filterValue: row.boldText },
    { content: row.regularText, filterValue: row.regularText },
    {
      content: <Nib variant="green" text={row.buttonText} />,
      filterValue: row.buttonText,
    },
  ]);

  const tableCols = [
    { name: "Bold Text" },
    { name: "Regular Text" },
    { name: "Actions" }, // Assuming the last column is for actions
  ];

  const headerProps = {
    title: "My Custom Table",
    buttonLabel: "Add Row",
    onButtonClick: () => console.log("Header Button Clicked"),
  };

  const filterProps = [
    {
      label: "Only Regular Text 3",
      logic: (row: any[]) =>
        row.some(
          (cell: { filterValue: string }) =>
            cell.filterValue === "Regular Text 3"
        ),
    },
    {
      label: "Only Regular Text 2",
      logic: (row: any[]) =>
        row.some(
          (cell: { filterValue: string }) =>
            cell.filterValue === "Regular Text 2"
        ),
    },
    // ... other filters
  ];

  const navigate = useNavigate();
  return (
    <PMLayout pageTitle="Dashboard">
      <div className={styles.metricsCards}>
        <MetricCard
          title="Properties"
          metricFunction={async () => await 10}
          Icon={BuildingIcon}
        />
        <MetricCard
          title="Active Projects"
          metricFunction={async () => await 10}
          Icon={BuildingIcon}
        />
        <MetricCard
          title="Unopened Bids"
          metricFunction={async () => await 10}
          Icon={BuildingIcon}
        />
      </div>
      <Button
        buttonStyle={ButtonStyles.PRIMARY}
        onClick={() => navigate("/create-property")}
        text="Create Property"
      />
      <Table
        header={headerProps}
        data={tableData}
        columns={tableCols}
        filters={filterProps}
        pageSize={3}
      />
    </PMLayout>
  );
}
