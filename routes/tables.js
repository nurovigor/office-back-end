import {Router} from 'express';
import {createTable, getTables, removeTable, updateTable} from "../controllers/tables.js";
import {createTableValidationRules, updateTableValidationRules} from "../validator/tables.js";
import {getValidationResult} from "../validator/getValidationResult.js";

const router = new Router();

//get tables
router.get('/', getTables)

//create table
router.post('/', createTableValidationRules(), getValidationResult, createTable);


//update table
router.put('/:id', updateTableValidationRules(), getValidationResult, updateTable)

//remove table
router.delete('/:id', removeTable)

export default router