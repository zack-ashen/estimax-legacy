import styles from "./FormHeader.module.scss";

interface FormHeaderProps {
  title: string;
  subtitle?: string;
}

export default function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <div className={styles.FormHeader}>
      <p className={`${styles.SectionHeader}`}>{title}</p>
      <p className={`${styles.SectionSubtitle} ${styles.subtitle}`}>
        {subtitle}
      </p>
    </div>
  );
}
