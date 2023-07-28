import express from 'express'
import { getUser } from '../controllers/userController';
import { Homeowner } from '../models/homeowner';

const router = express.Router();

router.route('/:id').get(async (req, res) => {
    const uid = req.params.id;

    const user = await getUser(uid);
    
    console.log(await Homeowner.findById(uid))

    res.send({ user })
})

export default router;