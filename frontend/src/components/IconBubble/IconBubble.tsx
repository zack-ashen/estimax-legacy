import styles from "./IconBubble.module.scss";

interface IconBubbleProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  size: "sm" | "md" | "lg";
}

export default function IconBubble({ Icon, size }: IconBubbleProps) {
  return (
    <div className={`${styles.IconBubble} ${styles[size]}`}>
      <Icon className={styles.icon} />
    </div>
  );
}
