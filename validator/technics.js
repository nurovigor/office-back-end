import {body} from 'express-validator';

export const technicValidationRules = () => {
    return [
        body('name').isString().isLength({min: 2}).withMessage('Name must be a string of at least 2 characters'),
        body('type').isString().isLength({min: 2}).withMessage('Type must be a string of at least 2 characters'),
        body('bind').isBoolean().withMessage('Bind must be a boolean'),
        body('serial').isString().exists().withMessage('Serial must be a string of at least 2 characters'),
    ]
}