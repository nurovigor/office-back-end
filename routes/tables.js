import {Router} from 'express';
import {createTable, getTables, removeTable, updateTable} from "../controllers/tables.js";

const router = new Router();

//get tables
router.get('/', getTables)

//create table
router.post('/', createTable);


//update table
router.put('/:id', updateTable)

//remove table
router.delete('/:id', removeTable)

export default router