import { useEffect, useState } from "react";

import styles from './ToastNotification.module.scss';

export interface ToastNotificationProps {
    message: string;
    type?: 'success' | 'error' | 'info'; // You can expand this with more types
    duration?: number; // Duration in milliseconds for the toast to remain visible, optional
    Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export default function ToastNotification({ message, Icon, type = 'info', duration = 3000}: ToastNotificationProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
  
      return () => clearTimeout(timer);
    }, [duration]);
  
    if (!visible) return null;
  
    return (
      <div className={`${styles.toast} ${styles[type]}`}>
        {Icon && <Icon className={styles.icon} />}
        {message}
      </div>
    );
}