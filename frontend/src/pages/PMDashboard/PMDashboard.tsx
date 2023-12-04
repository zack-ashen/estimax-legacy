import { useNavigate } from "react-router-dom";
import Button, { ButtonStyles } from "../../components/Button/Button";
import PMLayout from "../../components/Layouts/PMLayout/PMLayout";

import { MetricCard } from "../../components/Cards/MetricCard/MetricCard";
import styles from "./PMDashboard.module.scss";

import { ReactComponent as BuildingIcon } from "../../assets/icons/building.svg";

export default function PMDashboard() {
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
    </PMLayout>
  );
}
