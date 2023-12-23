import { CoinsIcon, DashboardIcon, SearchIcon } from "../../assets/icons";
import InboxIndicator from "../../components/InboxIndicator/InboxIndicator";
import NavBar from "../../components/NavBar/NavBar";
import NavLink from "../../components/NavLink/NavLink";
import NotificationIndicator from "../../components/NotificationIndicator/NotificationIndicator";
import styles from "./VendorLayout.module.scss";

const NavLinkObjs = [
  { name: "Dashboard", route: "/", Icon: DashboardIcon },
  { name: "Find Projects", route: "/find-projects", Icon: SearchIcon },
  { name: "Manage Quotes", route: "/manage-quotes", Icon: CoinsIcon },
];

const NavLinks = (
  <div className={styles.NavLinks}>
    {NavLinkObjs.map(({ name, route, Icon }) => (
      <NavLink name={name} link={route} Icon={Icon} />
    ))}
  </div>
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
        middleChild={NavLinks}
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
