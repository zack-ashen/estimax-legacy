import NavBar from "../../NavBar/NavBar";
import PMSidebar from "../../PMSidebar/PMSidebar";
import styles from "./PMLayout.module.scss";

interface PMLayoutProps extends React.PropsWithChildren {
  pageTitle: string;
}

export default function PMLayout({ pageTitle, children }: PMLayoutProps) {
  return (
    <div className={styles.PMLayout}>
      <PMSidebar />
      <div className={styles.rightSection}>
        <NavBar
          leftChild={<p className={styles.sectionHeader}>{pageTitle}</p>}
          rightChild={<p className={styles.sectionHeader}>Logout</p>}
        />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
