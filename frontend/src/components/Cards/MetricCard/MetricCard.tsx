import { useEffect, useState } from "react";

import styles from "./MetricCard.module.scss";

interface MetricCardProps {
  title: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  metricFunction: () => Promise<number>;
}

export function MetricCard({ title, Icon, metricFunction }: MetricCardProps) {
  const [metric, setMetric] = useState<number>(0);

  useEffect(() => {
    metricFunction().then((metric) => setMetric(metric));
  }, []);

  return (
    <div className={styles.MetricCard}>
      <div className={styles.metricLeft}>
        <p className={styles.metric}>{metric}</p>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.metricRight}>
        <Icon className={styles.Icon} />
      </div>
    </div>
  );
}
