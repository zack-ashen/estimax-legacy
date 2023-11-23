import styles from "./NavBar.module.scss";

interface NavBarProps {
  leftChild?: JSX.Element;
  middleChild?: JSX.Element;
  rightChild?: JSX.Element;
}

export default function NavBar({
  leftChild,
  middleChild,
  rightChild,
}: NavBarProps) {
  return (
    <nav className={styles.NavBar}>
      <div className={styles.leftContainer}>{leftChild}</div>
      <div className={styles.middleContainer}>{middleChild}</div>
      <div className={styles.rightContainer}>{rightChild}</div>
    </nav>
  );
}
