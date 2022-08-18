import {Router} from 'express';
import {createTechnic, getTechnics, removeTechnic, updateTechnic, getFilters} from "../controllers/technics.js";
import {getTechnicsValidator, technicValidationRules} from "../validator/technics.js";
import {getValidationResult} from "../validator/getValidationResult.js";

const router = new Router();

//get technics
router.get('/',getTechnicsValidator(), getValidationResult, getTechnics);

//get filters
router.get('/filters', getFilters);

//create developer
router.post('/', technicValidationRules(), getValidationResult, createTechnic);

//update technic
router.put('/:id', technicValidationRules(), getValidationResult, updateTechnic);

//remove developer
router.delete('/:id', removeTechnic);

export default router