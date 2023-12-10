import { useEffect, useState } from "react";
import styles from "./TabBar.module.scss";

interface TabBarProps {
  actionButton?: JSX.Element;
  items: {
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

  return (
    <div className={styles.TabBar}>
      <div className={styles.items}>
        {items.map((item, index) => (
          <button
            key={index}
            value={item.label}
            className={`${styles.tabButton} ${
              styles[selected === index ? "selected" : ""]
            }`}
            onClick={() => setSelected(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.actionButtonContainer}>
        {actionButton && actionButton}
      </div>
    </div>
  );
}
