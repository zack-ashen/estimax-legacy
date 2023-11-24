import React from 'react';
import styles from './Nib.module.scss';

interface NibProps {
  variant: 'green' | 'red' | 'yellow' | 'primary';
  text: string;
}

const Nib: React.FC<NibProps> = ({ variant, text }) => {
  return (
    <div className={`${styles.nib} ${styles[variant]}`}>
      {text}
    </div>
  );
}

export default Nib;
