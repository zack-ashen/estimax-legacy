import express from 'express'
import { getUser } from '../controllers/userController';
import { Homeowner } from '../models/homeowner';
import { MessageThread } from '../models/user';

const router = express.Router();

router.route('/:id').get(async (req, res, next) => {
    try {
        const uid = req.params.id;

        const user = await getUser(uid);

        res.send({ user })
    } catch (err) {
        next(err)
    }
})


router.route('/:id/messages').get(async (req, res, next) => {
    try {
        const messages : MessageThread[] = [];

        res.status(200).send({ messages })
    } catch (err) {
        next(err)
    }
})

export default router;