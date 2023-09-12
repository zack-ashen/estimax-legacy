import express from 'express'
import { createProject, getProject, getProjects } from '../controllers/projectController';
import { Errors, Timeline } from '../types';
import { ServerError } from '../middleware/errors';
import { Project } from '../models/project';
import Contractor from '../models/contractor';

const router = express.Router();


/* 
* Get all projects
*/
router.route('/').get(async (req, res) => {
   const limit = parseInt(req.query.limit as string);  // Number of documents to limit to
   const offset = parseInt(req.query.offset as string);  // Starting index

   const filter = {
      location: (req.query.location as string).split('|').map(loc => ({ location: new RegExp(loc, 'i') })),
      currentPrice: parseInt((req.query.currentPrice as string).slice(3).replace(/,/g, '')),
      timeline: req.query.timeline as string
   }

   const timelineValues = Object.values(Timeline) as string[];
   const timelineInd = timelineValues.indexOf(filter.timeline);
   const timelineQuery = timelineValues.slice(0,timelineInd+1).map(time => ({ timeline: time }));
   console.log(timelineQuery)

   const lowestBidQuery = Number.isNaN(filter.currentPrice) ? {} : filter.currentPrice !== 20000 ? { $or: [ 
      { 'lowestBid.amount': { $lt: filter.currentPrice }},
      { 'lowestBid': { $exists: false }} 
   ]} : { 'lowestBid.amount': { $gt: filter.currentPrice }}

   const locationTimelineQuery = timelineQuery.length === 0 ? { $or: filter.location } : { $and: [
      { $or: filter.location },
      { $or: timelineQuery },
   ] }
 
   const projects = await Project.find({
      ...locationTimelineQuery,
      ...lowestBidQuery,

   }).skip(offset).limit(limit);
  
   res.json(projects);
})

router.route('/search').get(async (req, res) => {
   const limit = parseInt(req.query.limit as string);
   const projectName = req.query.name as string;

   const projects = await Project.find({
      name: { $regex: projectName, $options: 'i' }
   }).limit(limit)

   res.status(200).send({ projects });
}) 

/* 
* Add a project
*/
router.route('/').post(async (req, res, next) => {
   try {
      const { project, homeownerId } = req.body;

      if (!project.name) {
         throw new ServerError('Project was missing a name', 500)
      }

      console.log(project)
   
      const newProject = await createProject({...project, homeowner_id: homeownerId});
      return res.status(200).send({ projectId: newProject.id})
   } catch (err) {
      next(err);
   }
})

/* 
* Get a project by id
*/
router.route('/:id').get(async (req, res, next) => {
   const projectId = req.params.id;

   try {
      const project = await getProject(projectId);
      
      res.send({ project })
   } catch (err) {
      next(err);
   }


})

/* 
* Update a project by id
*/
router.route('/:id').put((req, res) => {
    
})

/* 
* Delete a project by id
*/
router.route('/:id').delete(async (req, res) => {
    const id = req.params.id;

    await Project.deleteOne({ _id: id })

    res.status(200).send({ success: 'Succesfully deleted the project.'})
})

/* 
* Get all projects posted by a user
*/
router.route('/user/:id').get(async (req, res, next) => {
   const homeownerId = req.params.id;

   try {
      const project = await Project.find({ homeowner_id: homeownerId });
      
      res.send({ projects: project })
   } catch (err) {
      next(err);
   }
})

/* 
* Post a bid
*/
router.route('/:id/bid').post(async (req, res, next) => {
   const projectId = req.params.id;
   const contractorId = req.body.contractorId;
   const bid = req.body.bid;

   try {

      const project = await getProject(projectId);
      const bids = [...project!.bids, bid];

      let newLowestBid = project?.lowestBid;
      if (!project?.lowestBid || project.lowestBid.amount > bid.amount) {
         newLowestBid = bid;
      }
      const newProject = await Project.findOneAndUpdate({ _id: projectId },{ bids: bids, lowestBid: newLowestBid }, { new: true });
      await Contractor.findByIdAndUpdate(contractorId, { $push: { biddedProjects: projectId }})

      res.status(200).send({ project: newProject})
   } catch (err) {
      next(err);
   }
})

/* 
* Get bids
*/
router.route('/:id/bid').get(async (req, res, next) => {
   const projectId = req.params.id;

   try {
      const project = await getProject(projectId);
      res.status(200).send({ bids: project!.bids})
   } catch (err) {
      next(err);
   }
})

/*
* Post a Message
*/
router.route('/:id/message').post(async (req, res, next) => {
   const projectId = req.params.id;
   const msg = req.body.message;

   const newMessage = {
      message: msg,
      replies: []
   }

   try {
      const project = await getProject(projectId);
      const messages = [newMessage, ...project!.messages];

      const updatedProject = await Project.findOneAndUpdate({ _id: projectId }, { messages }, { new: true });
      res.status(200).send( { project: updatedProject} )

   } catch (err) {
      next(err)
   }
})

/*
* Get messages
*/
router.route('/:id/message').get(async (req, res, next) => {
   const projectId = req.params.id;

   try {
      const project = await getProject(projectId);

      res.status(200).send( { messages: project!.messages} )

   } catch (err) {
      next(err)
   }
})


router.route('/multiple').post(async (req, res, next) => {
   const projectIds = req.body.projects;

   try {
      const projects = await getProjects(projectIds);

      res.status(200).send( { projects })
   } catch (err) {
      next(err);
   }
})

export default router;