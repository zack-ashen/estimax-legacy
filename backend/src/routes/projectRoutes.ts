import express from 'express'
import { createProject } from '../controllers/projectController';

const router = express.Router();


/* 
* Get all projects
*/
router.route('/').get((req, res) => {
   // TODO: add support for pagination
   

})

/* 
* Add a project
*/
router.route('/').post((req, res) => {
   const project = req.body.project;
   try {
      createProject(project);
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