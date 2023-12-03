import NavBar from "../../NavBar/NavBar";
import NavLinks from "../../NavLinks/NavLinks";
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

export default function VendorLayout({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.VendorLayout}>
      <NavBar
        leftChild={<div>Logo</div>}
        middleChild={VendorNavLinks}
        rightChild={<div>Right</div>}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
