import {Router} from 'express';
import {createDeveloper, getDevelopers, removeDeveloper, updateDeveloper} from "../controllers/developers.js";
import {developerValidationRules} from "../validator/developers.js";
import {getValidationResult} from "../validator/getValidationResult.js";

const router = new Router();

//get developer
router.get('/', getDevelopers)

//create developer
router.post('/', developerValidationRules(), getValidationResult, createDeveloper);

//update developer
router.put('/:id', developerValidationRules(), getValidationResult, updateDeveloper);

//remove developer
router.delete('/:id', removeDeveloper);

export default router