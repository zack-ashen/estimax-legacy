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
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text?: string;
}

const Button = ({ buttonStyle, onClick, Icon, text, wide=false, ...rest }: ButtonProps) => {
  const style = {
    width: wide ? '100%' : 'fit-content'
  };

  return (
    <button 
      className={styles[buttonStyle]} 
      onClick={onClick} 
      style={style} {...rest}>
      {Icon && <div className={styles.iconContainer}><Icon className={styles.icon} /></div>} {text && <span className={styles.buttonText}>{text}</span>}
    </button>
  );
};

export default Button;