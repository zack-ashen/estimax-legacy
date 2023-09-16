import React, { createContext, useContext, useState } from 'react';
import ToastNotification, { ToastNotificationProps } from '../components/ToastNotification/ToastNotification';

interface ToastContextProps {
  addToast: (message: string, type?: ToastNotificationProps['type'], Icon?: ToastNotificationProps['Icon']) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: React.PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastNotificationProps[]>([]);

  const addToast = (message: string, type?: ToastNotificationProps['type'], Icon?: ToastNotificationProps['Icon']) => {
    setToasts((prevToasts) => [...prevToasts, { message, type, Icon }]);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.map((toast, idx) => (
        <ToastNotification key={idx} {...toast} />
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};