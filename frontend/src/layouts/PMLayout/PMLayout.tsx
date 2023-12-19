import ProjectSearch from "../../components/Inputs/ProjectSearch/ProjectSearch";
import NavBar from "../../components/NavBar/NavBar";
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
          rightChild={<ProjectSearch />}
        />
        <div className={`${styles.content} ${containerClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
