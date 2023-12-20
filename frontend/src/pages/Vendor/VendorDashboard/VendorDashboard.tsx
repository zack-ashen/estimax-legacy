import { useAuth } from "../../../contexts/AuthContext/AuthContext";
import useUser from "../../../hooks/useUser";
import VendorLayout from "../../../layouts/VendorLayout/VendorLayout";

import styles from "./VendorDashboard.module.scss";

export default function VendorDashboard() {
  const {
    userDetails: { id },
  } = useAuth();
  const { user } = useUser(id);

  return user ? (
    <VendorLayout containerClassName={styles.container}>
      <h4>Welcome back, {user.name}</h4>

      <section className={styles.notificationSection}>
        <p className={styles.SectionHeader}>Notifications</p>
      </section>

      <section className={styles.projectsSection}>
        <p className={styles.SectionHeader}>Projects</p>
      </section>
    </VendorLayout>
  ) : (
    <></>
  );
}
