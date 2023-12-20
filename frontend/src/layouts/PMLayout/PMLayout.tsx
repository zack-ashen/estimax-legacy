import InboxIndicator from "../../components/InboxIndicator/InboxIndicator";
import ProjectSearch from "../../components/Inputs/ProjectSearch/ProjectSearch";
import NavBar from "../../components/NavBar/NavBar";
import NotificationIndicator from "../../components/NotificationIndicator/NotificationIndicator";
import PMSidebar from "../../components/PMSidebar/PMSidebar";
import styles from "./PMLayout.module.scss";

interface PMLayoutProps extends React.PropsWithChildren {
  pageTitle?: string;
  containerClassName?: string;
}

export default function PMLayout({
  pageTitle,
  containerClassName,
  children,
}: PMLayoutProps) {
  const navRight = (
    <div className={styles.navRight}>
      <ProjectSearch /> <InboxIndicator /> <NotificationIndicator />
    </div>
  );

  return (
    <div className={styles.PMLayout}>
      <PMSidebar />
      <div className={styles.rightSection}>
        <NavBar
          leftChild={
            pageTitle ? (
              <p className={styles.sectionHeader}>{pageTitle}</p>
            ) : (
              <></>
            )
          }
          rightChild={navRight}
        />
        <div className={`${styles.content} ${containerClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
