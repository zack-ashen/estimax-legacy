import styles from "./PMSidebar.module.scss";

interface LinkSectionProps {
  title?: string;
  links: {
    name: string;
    link: string;
    Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  }[];
}
function LinkSection({ title, links }: LinkSectionProps) {
  return (
    <div className={styles.linkSection}>
      {title && <p className={styles.sidebarTitle}>{title}</p>}
      {links.map(({ name, link }) => (
        <a href={link} className={styles.link}>
          {name}
        </a>
      ))}
    </div>
  );
}

const linkSections: LinkSectionProps[] = [
  {
    links: [
      {
        name: "Dashboard",
        link: "/",
      },
      {
        name: "Favorite Vendors",
        link: "/vendors",
      },
    ],
  },
  {
    title: "Properties",
    links: [
      {
        name: "Properties",
        link: "/properties",
      },
      {
        name: "Add Property",
        link: "/properties/add",
      },
    ],
  },
];

export default function PMSidebar() {
  return (
    <div className={styles.PMSidebar}>
      <p className={styles.sectionHeader}>Estimax</p>
      <div className={styles.options}>
        <div className={styles.topSection}></div>
        <div className={styles.bottomSection}></div>
      </div>
    </div>
  );
}
