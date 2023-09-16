import Modal from "../Modal/Modal";

import { ReactComponent as PersonAdd } from '../../assets/PersonAddIcon.svg';

import styles from './InviteModal.module.scss';


interface InviteModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}


export default function InviteModal({ showModal, setShowModal }: InviteModalProps ) {

    return (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
            <div className={styles.header}>
                <div className={styles.iconContainer}>
                    <PersonAdd />
                </div>

                <h4>Invite a Contractor</h4>
            </div>

            
        </Modal>
    );
}