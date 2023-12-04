import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PMSidebar.module.scss";

import { ReactComponent as BookmarkIcon } from "../../assets/icons/bookmark.svg";
import { ReactComponent as BuildingIcon } from "../../assets/icons/building.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";

interface LinkProps {
  name: string;
  link: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function Link({ name, link, Icon }: LinkProps) {
  return (
    <div className={styles.link}>
      <p className={styles.linkText}></p>
    </div>
  );
}

interface DropdownLinkProps {
  name: string;
  links: LinkProps[];
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

function dropdownLink({ name, links, Icon }: DropdownLinkProps) {}

interface LinkSectionProps {
  title?: string;
  links: {
    name: string;
    link: string;
    Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[];
}
function LinkSection({ title, links }: LinkSectionProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.linkSection}>
      {title && <p className={styles.sidebarTitle}>{title.toUpperCase()}</p>}
      <div className={styles.linksContainer}>
        {links.map(({ name, link, Icon }) => (
          <button
            className={`${styles.sidebarLink} ${
              styles[location.pathname === link ? "selected" : ""]
            }`}
            key={name}
            onClick={() => navigate(link)}
          >
            {Icon && <Icon className={styles.sidebarIcon} />}
            {name}
          </button>
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
    ],
  },
  {
    title: "Properties",
    links: [
      {
        name: "Properties",
        link: "/properties",
        Icon: BuildingIcon,
      },
      {
        name: "Add Property",
        link: "/create-property",
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
          {linkSections.map((linkSection) => (
            <LinkSection {...linkSection} />
          ))}
        </div>
        <div className={styles.bottomSection}></div>
      </div>
    </div>
  );
}
