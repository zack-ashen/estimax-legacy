import express from 'express'
import Contractor from '../models/contractor';
import { findContractor, findContractors, updateContractor } from '../controllers/contractorController';

const router = express.Router();

router.route('/').post((req, res) => {

})

router.route('/filter').get(async (req, res, next) => {
    const { limit, 
            offset, 
            location, 
            contractorType, 
            reviews } = req.query;

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

    try {
        const contractors = await findContractors({}, offset as number | undefined, limit as number | undefined);
        res.status(200).send({ contractors });
    } catch (err) {
        next(err)
    }
})

router.route('/:id/bookmarks').get(async (req, res, next) => {
    const id = req.params.id;

    try {
        const contractor = await Contractor.findById(id);
        res.status(200).send({ bookmarks: contractor?.starredProjects })
    } catch (err) {
        next(err);
    }
})

router.route('/:id/bookmark').post(async (req, res, next) => {
    const uid = req.params.id;
    const bookmark = req.body.bookmark;
    const projectId = req.body.project;

    try {
        if (bookmark) {
            updateContractor(uid, { $pull: { starredProjects: projectId } } );
        } else {
            updateContractor(uid, { $push: { starredProjects: projectId } } );
        }
        res.status(200).send({ status: 'succesfully bookmarked' });
    } catch (err) {
        next(err);
    }
})

router.route('/:id').get(async (req, res, next) => {
    const uid = req.params.id;

    try {
        const contractor = await findContractor(uid);

        res.status(200).send({ contractor })
    } catch (err) {
        next(err)
    }
})



export default router;