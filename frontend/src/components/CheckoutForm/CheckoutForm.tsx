import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Button, { ButtonStyles } from '../Inputs/Button/Button'
import styles from './CheckoutForm.module.scss'
import { useEffect } from 'react';

interface CheckoutFormProps {
    addBid: () => void;
    returnURL: string;
}

export default function CheckoutForm({ addBid, returnURL }: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();


    useEffect(() => {
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
    
        if (!clientSecret) {
          return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          switch (paymentIntent!.status) {
            case "succeeded":
              console.log("Payment succeeded!");
              break;
            case "processing":
              console.log("Your payment is processing.");
              break;
            case "requires_payment_method":
              console.log("Your payment was not successful, please try again.");
              break;
            default:
              console.log("Something went wrong.");
              break;
          }
        });
      }, [stripe]);


    const handleSubmit = async () => {
        if (!stripe || !elements) {
          // Stripe.js hasn't yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: returnURL,
            receipt_email: 'zachary.h.a@gmail.com',
          },
        });
    
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
        } else {
        }

        addBid();
    };

    return (
        <form className={styles.CheckoutForm}>
            <PaymentElement />
            <Button buttonStyle={ButtonStyles.PRIMARY} text={'Place Bid'} onClick={handleSubmit} wide />
        </form>
        
    )
}