import Button, { ButtonStyles } from '../Inputs/Button/Button'
import TextInput from '../Inputs/TextInput/TextInput'
import Modal from '../Modal/Modal'
import styles from './CreateBidModal.module.scss'
import { ReactComponent as DollarIcon } from '../../assets/DollarIcon.svg';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Project } from '../../types';

interface CreateBidModalProps {
    showCreateBidModal: boolean;
    setShowCreateBidModal: React.Dispatch<React.SetStateAction<boolean>>;
    setProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    projectId: string;
}

export default function CreateBidModal({ showCreateBidModal, setShowCreateBidModal, projectId, setProject }: CreateBidModalProps) {
    const [ amount, setAmount ] = useState('');
    const [ description, setDescription ] = useState('');

    const { useAuthReq, user } = useAuth();
    const authReq = useAuthReq();
    
    const addBid = () => {
        authReq(`/api/project/${projectId}/bid`, {
            method: 'POST',
            body: JSON.stringify({
                projectId,
                bid: {
                    contractorId: user.uid,
                    time: new Date(),
                    amount,
                    description,
                    status: 'Under Review',
                    expiration: new Date()
                }
            })
        })
            .then(res => res?.json())
            .then(data => setProject(data.project))

        setShowCreateBidModal(false);
    }

    return (
        <Modal show={showCreateBidModal} onClose={() => setShowCreateBidModal(false)}>
        <div className={styles.placeBidModal}>
          <div className={styles.modalHeader}>
            <div className={styles.headerIconContainer}>
              <DollarIcon className={styles.headerIcon} />
            </div>
            <h3>Place a Bid</h3>
            <p>Place a  bid on this project. Describe the work you are going to complete and the price you are requesting for your work.</p>
          </div>
          <TextInput name={'Amount'} value={amount} onChange={(e) => setAmount(e.target.value)}/>
          <TextInput name={'Description of Work'} value={description} onChange={(e) => setDescription(e.target.value)} type={'textarea'} />
          <Button buttonStyle={ButtonStyles.PRIMARY} text={'Place Bid'} onClick={() => addBid()} wide/>
        </div>
      </Modal>
    )
}