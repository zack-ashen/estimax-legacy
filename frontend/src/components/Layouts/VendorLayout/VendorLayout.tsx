import NavBar from "../../NavBar/NavBar";
import styles from "./VendorLayout.module.scss";

export default function VendorLayout({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.VendorLayout}>
      <NavBar leftChild={<div>Logo</div>} rightChild={<div>Right</div>} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
