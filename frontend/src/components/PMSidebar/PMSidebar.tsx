import styles from "./PMSidebar.module.scss";

interface LinkSectionProps {
  title?: string;
  links: {
    name: string;
    link: string;
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

export default function PMSidebar() {
  return (
    <div className={styles.PMSidebar}>
      <h3>Estimax</h3>
    </div>
  );
}
