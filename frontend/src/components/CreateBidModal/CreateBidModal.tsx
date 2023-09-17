import Button, { ButtonStyles } from '../Inputs/Button/Button'
import TextInput from '../Inputs/TextInput/TextInput'
import Modal from '../Modal/Modal'
import styles from './CreateBidModal.module.scss'
import { ReactComponent as DollarIcon } from '../../assets/DollarIcon.svg';
import { ReactComponent as USDIcon } from '../../assets/USDIcon.svg';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Project } from '../../types';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

interface CreateBidModalProps {
    showCreateBidModal: boolean;
    setShowCreateBidModal: React.Dispatch<React.SetStateAction<boolean>>;
    setProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
    projectId: string;
}

const calculatePrice = (totalAmount: number) => {
  if (totalAmount <= 10) {
    return 5.00;
  }

  const amount = (totalAmount * 0.07);
  if (amount > 50.00) {
    return 50.00;
  } else if (amount < 5.00) {
    return 5.00;
  }

  return isNaN(amount) ? 0.00 : amount;
}

export default function CreateBidModal({ showCreateBidModal, setShowCreateBidModal, projectId, setProject }: CreateBidModalProps) {
    const [ description, setDescription ] = useState('');
    const [ page, setPage ] = useState(1);
    const [ amountError, setAmountError ] = useState('');
    const [ descriptionError, setDescriptionError ] = useState('');
    const [ stripeOptions, setStripeOptions ] = useState();
    const [ bidPrice, setBidPrice ] = useState(10);
    const [ bidValue, setBidValue ] = useState(bidPrice.toString());
    const [ contractorPrice, setContractorPrice ] = useState(calculatePrice(bidPrice))
    const { useAuthReq, user } = useAuth();
    const authReq = useAuthReq();

    const paymentIntent = () => {
      authReq(`/api/payment/intent`, {
        method: 'POST',
        body: JSON.stringify({
          amount: bidPrice
        })
      })
        .then(res => res?.json())
        .then(data => setStripeOptions(data.clientSecret))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    useEffect(() => {
      const bidValueNum = parseFloat(bidValue);
      if (!isNaN(bidValueNum) && /^[0-9]*\.?[0-9]{0,2}$/.test(bidValue)) {
        setBidPrice(bidValueNum);
        setContractorPrice(calculatePrice(bidValueNum));
      }
    }, [bidValue])

    const addBid = () => {
        authReq(`/api/project/${projectId}/bid`, {
            method: 'POST',
            body: JSON.stringify({
                contractorId: user.uid,
                bid: {
                    contractorId: user.uid,
                    time: new Date(),
                    amount: bidPrice,
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


    const validatePageOne = () => {
      if (!/^[0-9]*\.?[0-9]{0,2}$/.test(bidValue)) {
        setAmountError('Please enter a valid price.')
        return false;
      } else if (bidPrice <= 10) {
        setAmountError('You must have a bid price more than $9.')
        return false;
      } else if (description === '') {
        setDescriptionError('You have to describe the work you are going to complete.')
        return false;
      }

      paymentIntent();
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
            <p>What price are you requesting for your work?</p>
          </div>
          <p className={styles.paymentDisclosure}>You Pay <span className={styles.price}>${contractorPrice.toFixed(2)}</span></p>
          <TextInput 
            name={'Amount'} 
            value={bidValue} 
            onChange={(e) => setBidValue(e.target.value)}
            error={amountError}
            Icon={USDIcon}
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
              <p className={styles.bidDescription}>Bid for ${bidPrice}</p>
              <p className={styles.bidComputedAmount}>7% × ${bidPrice}</p>
            </div>
            <div className={styles.horizontalDivider} />
            <div className={styles.totalPayment}>
              <p className={styles.totalText}>Total</p>
              <p className={styles.totalAmount}>${contractorPrice.toFixed(2)}</p>
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