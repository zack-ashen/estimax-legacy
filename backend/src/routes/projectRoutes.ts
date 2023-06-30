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
router.route('/').post(async (req, res, next) => {
   try {
      const { project } = req.body;

      console.log(project)

      if (!project.name) {
         throw new ServerError('Project was missing a name', 500)
      }

      console.log(project)
   
      const newProject = await createProject(project);
      return res.status(200).send({ projectId: newProject.id})
   } catch (err) {
      next(err);
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