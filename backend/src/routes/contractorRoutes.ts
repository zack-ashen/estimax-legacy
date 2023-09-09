import express from 'express'
import Contractor from '../models/contractor';

const router = express.Router();

router.route('/').post((req, res) => {

})

router.route('/filter').get(async (req, res, next) => {
    const { limit, offset, location, contractorType, reviews } = req.query;

    const filter = {
        location: {},
        contractorType: {},
        reviews: {}
    }

    if (location) {
        // filter.location = { $or: (location as string).split('|') };
    }
    if (contractorType) {
        // filter.contractorType = { $or: (contractorType as string).split('|') };
    }
    if (reviews) {
        // filter.reviews = { $or: (reviews as string).split('|') };  // this assumes `reviews` is an array in the schema
    }

    console.log(filter)

    try {
        const contractors = await Contractor.find({}).skip(+offset!).limit(+limit!);
        res.status(200).send({ contractors });
    } catch (err) {
        next(err)
    }
})

router.route('/:id').get(async (req, res) => {
    const id = req.params.id;

    const contractor = await Contractor.findById(id);

    res.status(200).send({ contractor })
})



export default router;