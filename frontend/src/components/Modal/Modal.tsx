import { PropsWithChildren } from 'react';
import styles from './Modal.module.scss';

import { ReactComponent as CloseIcon } from '../../assets/CloseIcon.svg';
import Button, { ButtonStyles } from '../Inputs/Button/Button';

interface ModalProps extends PropsWithChildren {
    show: boolean;
    onClose: () => void;
  }
  
  export default function Modal({ show, onClose, children }: ModalProps) {
    if (!show) {
      return null;
    }
  
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
    }
  
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => stopPropagation(e)}>
            <div className={styles.closeButton}>
                <Button buttonStyle={ButtonStyles.TERTIARY} onClick={onClose} Icon={CloseIcon}/>
            </div>
            {children}
        </div>
      </div>
    );
  }