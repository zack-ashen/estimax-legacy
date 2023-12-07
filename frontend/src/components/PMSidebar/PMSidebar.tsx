import { useLocation, useNavigate } from "react-router-dom";
import {
  BankIcon,
  BookmarkIcon,
  BuildingIcon,
  DashboardIcon,
  DocumentIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
} from "../../assets/icons";
import styles from "./PMSidebar.module.scss";

interface SidebarLinkProps {
  name: string;
  link: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  action?: {
    Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    navigate: string;
  };
}

function SidebarLink({ name, link, Icon, action }: SidebarLinkProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button
      className={`${styles.sidebarLink} ${
        styles[location.pathname === link ? "selected" : ""]
      }`}
      key={name}
      onClick={() => navigate(link)}
    >
      <div className={styles.linkContent}>
        {Icon && <Icon className={styles.sidebarIcon} />}
        {name}
      </div>
      {action && (
        <button
          className={styles.actionButton}
          onClick={(e) => {
            e.stopPropagation();
            navigate(action.navigate);
          }}
        >
          {<action.Icon className={styles.actionIcon} />}
        </button>
      )}
    </button>
  );
}

interface LinkSectionProps {
  title?: string;
  links: SidebarLinkProps[];
}
function LinkSection({ title, links }: LinkSectionProps) {
  return (
    <div className={styles.linkSection}>
      {title && <p className={styles.sidebarTitle}>{title.toUpperCase()}</p>}
      <div className={styles.linksContainer}>
        {links.map((sidebarLinkProps) => (
          <SidebarLink {...sidebarLinkProps} />
        ))}
      </div>
    </div>
  );
}

const linkSections: LinkSectionProps[] = [
  {
    links: [
      {
        name: "Dashboard",
        link: "/",
        Icon: DashboardIcon,
      },
      {
        name: "Favorite Vendors",
        link: "/vendors",
        Icon: BookmarkIcon,
      },
      {
        name: "Find Vendors",
        link: "/find-vendors",
        Icon: SearchIcon,
      },
      {
        name: "My Properties",
        link: "/properties",
        Icon: BuildingIcon,
        action: {
          Icon: PlusIcon,
          navigate: "/create-property",
        },
      },
    ],
  },
  {
    title: "Financials",
    links: [
      {
        name: "Billing",
        link: "/financials/billing",
        Icon: BankIcon,
      },
      {
        name: "Documents",
        link: "/financials/documents",
        Icon: DocumentIcon,
      },
    ],
  },
];

export default function PMSidebar() {
  return (
    <div className={styles.PMSidebar}>
      <p className={styles.sectionHeader}>Estimax</p>
      <div className={styles.options}>
        <div className={styles.topSection}>
          {linkSections.map((linkSection, index) => (
            <LinkSection {...linkSection} key={index} />
          ))}
        </div>
        <div className={styles.bottomSection}>
          <SidebarLink name="Settings" link="/settings" Icon={SettingsIcon} />
        </div>
      </div>
    </div>
  );
}
