import { PropsWithChildren } from 'react';
import styles from './Modal.module.scss';


interface ModalProps extends PropsWithChildren {
    showModal: boolean;
}

export default function Modal({ children, showModal }: ModalProps) {

    return (
        <div className={styles.Modal}>
            {children}
        </div>
    )
}