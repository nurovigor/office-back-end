import {Router} from 'express';
import {createDeveloper, getDevelopers, removeDeveloper, updateDeveloper} from "../controllers/developers.js";

const router = new Router();

//get developer
router.get('/', getDevelopers)

//create developer
router.post('/', createDeveloper);

//create developer
router.put('/:id', updateDeveloper);

//remove developer
router.delete('/:id', removeDeveloper);

export default router