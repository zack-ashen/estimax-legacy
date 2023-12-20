import InboxIndicator from "../../components/InboxIndicator/InboxIndicator";
import NavBar from "../../components/NavBar/NavBar";
import NavLinks from "../../components/NavLinks/NavLinks";
import NotificationIndicator from "../../components/NotificationIndicator/NotificationIndicator";
import styles from "./VendorLayout.module.scss";

const VendorNavLinks = (
  <NavLinks
    links={[
      { name: "Dashboard", route: "/" },
      { name: "Find Projects", route: "/find-projects" },
      { name: "Manage Quotes", route: "/manage-quotes" },
    ]}
  />
);

interface VendorLayoutProps extends React.PropsWithChildren {
  containerClassName?: string;
}

export default function VendorLayout({
  children,
  containerClassName,
}: VendorLayoutProps) {
  return (
    <div className={styles.VendorLayout}>
      <NavBar
        leftChild={<div>Logo</div>}
        middleChild={VendorNavLinks}
        rightChild={
          <div className={styles.vendorRight}>
            <NotificationIndicator /> <InboxIndicator />
          </div>
        }
      />
      <div className={`${styles.content} ${containerClassName}`}>
        {children}
      </div>
    </div>
  );
}
