import express from 'express'
import Stripe from 'stripe'


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

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: '2023-08-16'
});

const router = express.Router();

router.route('/intent').post(async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(calculatePrice(amount) * 100), // amount in cents
            currency: 'usd'
        });
        res.status(200).send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (err) {
        res.status(500).json({ errorCode: 500, msg: err });
    }
})



export default router;