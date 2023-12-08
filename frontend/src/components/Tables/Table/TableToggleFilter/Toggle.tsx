import React from 'react';
import styles from './Toggle.module.scss';

interface ToggleProps {
  text: string;
  isActive: boolean;
  onClick: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ text, isActive, onClick }) => {
  const buttonStyle = isActive ? styles.active : styles.inactive;

  return (
    <button className={`${styles.toggleButton} ${buttonStyle}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Toggle;
