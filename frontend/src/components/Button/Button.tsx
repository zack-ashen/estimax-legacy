import { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.scss";

export enum ButtonStyles {
  PRIMARY = "primary",
  PRIMARY_ALT = "primaryAlt",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  LINK = "link",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle: ButtonStyles;
  wide?: boolean;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text?: string;
  selected?: boolean;
}

const Button = ({
  buttonStyle,
  onClick,
  Icon,
  type,
  text,
  selected = false,
  wide = false,
}: ButtonProps) => {
  const style = {
    width: wide ? "100%" : "fit-content",
  };

  return (
    <button
      className={`${styles[buttonStyle]} ${styles[selected ? "selected" : ""]}`}
      onClick={onClick}
      style={style}
      type={type}
    >
      {Icon && (
        <div className={styles.iconContainer}>
          <Icon className={styles.icon} />
        </div>
      )}
      {text && <span className={styles.buttonText}>{text}</span>}
    </button>
  );
};

export default Button;
