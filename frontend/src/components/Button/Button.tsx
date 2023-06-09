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
  fontSize?: string;
  wide?: boolean;
}

const Button = ({ buttonStyle, onClick, children, fontSize='1em', wide=false, ...rest }: ButtonProps) => {
  const style = {
    fontSize,
    width: wide ? '100%' : 'fit-content'
  };

  return (
    <button 
      className={styles[buttonStyle]} 
      onClick={onClick} 
      style={style} {...rest}>
      {children}
    </button>
  );
};

export default Button;