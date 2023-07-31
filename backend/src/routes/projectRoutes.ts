import express from 'express'
import { createProject, getProject } from '../controllers/projectController';
import { Errors } from '../types';
import { ServerError } from '../middleware/errors';
import { Project } from '../models/project';

const router = express.Router();


/* 
* Get all projects
*/
router.route('/').get(async (req, res) => {
   const limit = parseInt(req.query.limit as string);  // Number of documents to limit to
   const offset = parseInt(req.query.offset as string);  // Starting index
 
   const projects = await Project.find().skip(offset).limit(limit);
 
   res.json(projects);
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
   const bid = req.body.bid;

   try {

      const project = await getProject(projectId);
      const bids = [...project!.bids, bid];

      let newLowestBid = project?.lowestBid;
      if (!project?.lowestBid || project.lowestBid.amount > bid.amount) {
         newLowestBid = bid;
      }
      const newProject = await Project.findOneAndUpdate({ _id: projectId },{ bids: bids, lowestBid: newLowestBid }, { new: true });

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

   try {
      const project = await getProject(projectId);
      const messages = [msg, ...project!.messages];

      const updatedProject = await Project.findOneAndUpdate({ _id: projectId }, { messages }, { new: true });
      res.status(200).send( { project: updatedProject} )

   } catch (err) {
      next(err)
   }
})


export default router;