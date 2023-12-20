import PMLayout from "../../layouts/PMLayout/PMLayout";

import { MetricCard } from "../../components/Cards/MetricCard/MetricCard";
import styles from "./PMDashboard.module.scss";

import { CoinsIcon, ToolIcon } from "../../assets/icons";
import { ReactComponent as BuildingIcon } from "../../assets/icons/building.svg";
import ActiveProjectsTable from "../../components/Tables/ActiveProjectsTable/ActiveProjectsTable";

export default function PMDashboard() {
  return (
    <PMLayout
      pageTitle="Dashboard"
      containerClassName={styles.dashboardContainer}
    >
      <div className={styles.metricsCards}>
        <MetricCard
          title="Properties"
          metricFunction={async () => await 10}
          Icon={BuildingIcon}
        />
        <MetricCard
          title="Active Projects"
          metricFunction={async () => await 10}
          Icon={ToolIcon}
        />
        <MetricCard
          title="Unopened Bids"
          metricFunction={async () => await 10}
          Icon={CoinsIcon}
        />
      </div>
      <ActiveProjectsTable />
    </PMLayout>
  );
}
