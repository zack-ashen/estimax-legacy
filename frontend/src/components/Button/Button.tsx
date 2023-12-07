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
  LeftIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  RightIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text?: string;
  selected?: boolean;
}

const Button = ({
  buttonStyle,
  onClick,
  LeftIcon,
  RightIcon,
  type = "button",
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
      {LeftIcon && (
        <div className={styles.iconContainer}>
          <LeftIcon className={styles.icon} />
        </div>
      )}
      {text && <span className={styles.buttonText}>{text}</span>}
      {RightIcon && (
        <div className={styles.iconContainer}>
          <RightIcon className={styles.icon} />
        </div>
      )}
    </button>
  );
};

export default Button;
