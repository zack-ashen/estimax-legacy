import styles from "./Card.module.scss";

export enum CardWidth {
  XS = "24rem",
  SM = "40rem",
  MD = "48rem",
  LG = "64rem",
  XL = "80rem",
}

interface CardProps extends React.PropsWithChildren {
  width?: CardWidth;
  maxWidth?: CardWidth;
  minWidth?: CardWidth;
  align?: "left" | "center";
}

export default function Card({
  children,
  width,
  maxWidth,
  minWidth,
  align = "left",
}: CardProps) {
  const style = {
    width: width ? width : "fit-content",
    maxWidth: maxWidth ? maxWidth : "auto",
    minWidth: minWidth ? minWidth : "auto",
    alignItems: align,
  };

  return (
    <div className={styles.Card} style={style}>
      {children}
    </div>
  );
}
