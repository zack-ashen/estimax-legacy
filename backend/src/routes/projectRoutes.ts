import express from 'express'
import { createProject } from '../controllers/projectController';
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
router.route('/').post((req, res) => {
   const project = req.body.project;

   if (!project.title) {
      throw new ServerError(Errors.RESOURCE_CREATION, 400)
   }
   try {
      createProject();
      return res.status(200)
   } catch (e) {

   }
})

/* 
* Get a project by id
*/
router.route('/:id').get((req, res) => {
   const projectId = req.params.id;


})

/* 
* Update a project by id
*/
router.route('/:id').put((req, res) => {
    
})

/* 
* Delete a project by id
*/
router.route('/:id').delete((req, res) => {
    
})



export default router;