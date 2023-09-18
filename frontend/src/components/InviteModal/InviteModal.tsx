import Modal from "../Modal/Modal";

import { ReactComponent as PersonAdd } from '../../assets/PersonAddIcon.svg';

import styles from './InviteModal.module.scss';
import TextInput from "../Inputs/TextInput/TextInput";
import { useState } from "react";
import Button, { ButtonStyles } from "../Inputs/Button/Button";


interface InviteModalProps {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}


export default function InviteModal({ showModal, setShowModal }: InviteModalProps ) {
    const [ phoneNumber, setPhoneNumber ] = useState('')

    return (
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <PersonAdd className={styles.icon} />
          </div>
          <h3>Invite to Estimax</h3>
          <p>
            Invite a contractor or homeowner to Estimax.
          </p>
        </div>

        <div className={styles.modalContent}>
            <div className={styles.inviteByPhone}>
                <p className={styles.inviteByPhoneText}>Enter your invite's phone number</p>
                <TextInput name={'Phone Number'} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder={'3472771442'}/>
            </div>
        </div>
        <Button buttonStyle={ButtonStyles.PRIMARY} text={'Invite to Estimax'} onClick={() => setShowModal(false)} wide/>
      </Modal>
    );
}