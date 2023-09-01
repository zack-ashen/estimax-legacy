import Button, { ButtonStyles } from '../Inputs/Button/Button'
import TextInput from '../Inputs/TextInput/TextInput'
import Modal from '../Modal/Modal'
import styles from './CreateBidModal.module.scss'
import { ReactComponent as DollarIcon } from '../../assets/DollarIcon.svg';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Project } from '../../types';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NF81eFgHcBqsf1Z2VN4WelbB2MLj1lkPygvyOwgy3HwNEYXD8LOuP395V0sVAGWZ5ri9qEjH34GRY69PUK9mYSB00B3w4IdNo');

interface CreateBidModalProps {
    showCreateBidModal: boolean;
    setShowCreateBidModal: React.Dispatch<React.SetStateAction<boolean>>;
    setProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    projectId: string;
}

export default function CreateBidModal({ showCreateBidModal, setShowCreateBidModal, projectId, setProject }: CreateBidModalProps) {
    const [ amount, setAmount ] = useState('5');
    const [ computedAmount, setComputedAmount ] = useState<number>(parseFloat(amount))
    const [ description, setDescription ] = useState('');
    const [ page, setPage ] = useState(1);
    const [ amountError, setAmountError ] = useState('');
    const [ descriptionError, setDescriptionError ] = useState('');
    const [ stripeOptions, setStripeOptions ] = useState();
    const { useAuthReq, user } = useAuth();
    const authReq = useAuthReq();

    useEffect(() => {
      authReq(`/api/payment/intent`, {
        method: 'POST',
        body: JSON.stringify({
          amount: (0.07 * computedAmount).toFixed(2)
        })
      })
        .then(res => res?.json())
        .then(data => setStripeOptions(data.clientSecret))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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


    const computePayment = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.target.value === '') {
        setComputedAmount(0);
        setAmount(e.target.value)
      } else if (!isNaN(parseFloat(e.target.value))) {
        setAmount(e.target.value);
        setComputedAmount(parseFloat(e.target.value))
      }
    }

    const validatePageOne = () => {
      if (computedAmount === 0) {
        setAmountError('You must have a bid price more than 0.')
        return false;
      } else if (description === '') {
        setDescriptionError('You have to describe the work you are going to complete.')
        return false;
      }

      return true;
    }

    return (
      <Modal show={showCreateBidModal} onClose={() => setShowCreateBidModal(false)} back={page !== 1 ? (() => setPage(page => page - 1)) : undefined}>
        {page === 1 &&
        <div className={styles.placeBidModal}>
          <div className={styles.modalHeader}>
            <div className={styles.headerIconContainer}>
              <DollarIcon className={styles.headerIcon} />
            </div>
            <h3>Place a Bid</h3>
            <p>Describe the work you are going to complete and the price you are requesting for your work.</p>
          </div>
          <p className={styles.paymentDisclosure}>You Pay <span className={styles.price}>${(0.07 * computedAmount).toFixed(2)}</span></p>
          <TextInput 
            name={'Amount'} 
            value={amount} 
            onChange={computePayment}
            error={amountError}
          />
          <TextInput 
            name={'Description of Work'} 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            type={'textarea'} 
            error={descriptionError}
          />
          <Button buttonStyle={ButtonStyles.PRIMARY} text={'Continue'} onClick={() => validatePageOne() && setPage(2)} wide/>
        </div>}
        {page === 2 &&
        <div className={styles.paymentModal}>
          <div className={styles.modalHeader}>
            <div className={styles.headerIconContainer}>
              <DollarIcon className={styles.headerIcon} />
            </div>
            <h3>Place a Bid</h3>
            <p>Enter your payment details to pay for your bid.</p>
          </div>

          <div className={styles.invoice}>
            <div className={styles.bidSummary}>
              <p className={styles.bidDescription}>Bid for ${computedAmount}</p>
              <p className={styles.bidComputedAmount}>7% × ${computedAmount}</p>
            </div>
            <div className={styles.horizontalDivider} />
            <div className={styles.totalPayment}>
              <p className={styles.totalText}>Total</p>
              <p className={styles.totalAmount}>${(0.07 * computedAmount).toFixed(2)}</p>
            </div>
          </div>
          
          {stripeOptions &&
            <Elements stripe={stripePromise} options={{
              clientSecret: `${stripeOptions}`,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#5670D9',
                  fontFamily: 'Inter, Ideal Sans, system-ui, sans-serif',
                  colorText: '#1D2939',
                  colorDanger: '#F04438',
                  spacingUnit: '4px',
                  borderRadius: '6px'
                }
              }
            }}
            >
              <CheckoutForm addBid={addBid} returnURL={`http://localhost:3000/project/${projectId}`}/>
            </Elements>
          }

          
        </div>
        }
      </Modal>
    )
}