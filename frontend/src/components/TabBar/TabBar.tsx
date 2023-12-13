import { FunctionComponent, SVGProps, useEffect, useState } from "react";
import styles from "./TabBar.module.scss";

interface TabBarProps {
  actionButton?: JSX.Element;
  items: {
    Icon?: FunctionComponent<SVGProps<SVGSVGElement>>;
    label: string;
  }[];
  changeChildComp: (index: number) => void;
}

export default function TabBar({
  actionButton,
  items,
  changeChildComp,
}: TabBarProps) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    changeChildComp(selected);
  }, [changeChildComp, selected]);

  const isSelected = (index: number) => (selected === index ? "selected" : "");

  return (
    <div className={styles.TabBar}>
      <div className={styles.items}>
        {items.map((item, index) => (
          <div
            className={`${styles.tabButtonContainer} ${
              styles[isSelected(index)]
            }`}
          >
            <button
              key={index}
              value={item.label}
              className={styles.tabButton}
              onClick={() => setSelected(index)}
            >
              {item.Icon && <item.Icon className={styles.tabButtonIcon} />}
              {item.label}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.actionButtonContainer}>
        {actionButton && actionButton}
      </div>
    </div>
  );
}
