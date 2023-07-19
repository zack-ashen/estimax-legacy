import express from 'express'
import { getUser } from '../controllers/userController';

const router = express.Router();

router.route('/:id').get(async (req, res) => {
    const uid = req.params.id;

    const user = getUser(uid);

    res.send({ user })
})

export default router;