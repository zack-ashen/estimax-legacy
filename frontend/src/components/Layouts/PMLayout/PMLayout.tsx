import NavBar from "../../NavBar/NavBar";
import styles from "./PMLayout.module.scss";

interface PMLayoutProps extends React.PropsWithChildren {
  pageTitle: string;
}

export default function PMLayout({ pageTitle, children }: PMLayoutProps) {
  return (
    <div className={styles.PMLayout}>
      <div className={styles.sidebar}></div>
      <div className={styles.rightSection}>
        <NavBar
          leftChild={<p className={styles.sectionHeader}>{pageTitle}</p>}
        />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
