import express from 'express'
import Stripe from 'stripe'


const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: '2023-08-16'
});

const router = express.Router();

router.route('/intent').post(async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1 * 100, // amount in cents
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