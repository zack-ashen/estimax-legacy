import { ButtonHTMLAttributes } from "react";

import styles from './Button.module.scss';

export enum ButtonStyles {
  PRIMARY = 'primary',
  PRIMARY_ALT = 'primaryAlt',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  buttonStyle: ButtonStyles; 
}

const Button = ({ buttonStyle, onClick, children, ...rest }: ButtonProps) => {
  return (
    <button className={styles[buttonStyle]} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;