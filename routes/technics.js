import {Router} from 'express';
import {createTechnic, getTechnics, removeTechnic, updateTechnic, getFilters} from "../controllers/technics.js";

const router = new Router();

//get technics
router.get('/', getTechnics);

//get filters
router.get('/filters', getFilters);

//create developer
router.post('/', createTechnic);

//update technic
router.put('/:id', updateTechnic);

//remove developer
router.delete('/:id', removeTechnic);

export default router