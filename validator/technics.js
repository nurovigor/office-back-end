import {body, param} from 'express-validator';

export const technicValidationRules = () => {
    return [
        body('name').isString().withMessage('Name must be a string').isLength({min: 2}).withMessage('The name must contain 2 or more characters'),
        body('type').isString().withMessage('Name must be a string').isLength({min: 2}).withMessage('The type must contain 2 or more characters'),
        body('bind')
            .toLowerCase()
            .replace('yes', true)
            .replace('no', false)
            .isBoolean()
            .withMessage('Bind must be a boolean'),
        body('serial').exists().optional({nullable: true}).replace("", null)
            .isString().withMessage('Name must be a string')
            .toUpperCase()
            .isLength({min: 2}).withMessage('The serial must contain 2 or more characters'),
    ]
};

export const getTechnicsValidator = () => {
    return [
        param('name').optional({nullable: true}).isString().withMessage('Name must be a string').isLength({min: 2}).withMessage('The name must contain 2 or more characters').optional({nullable: true}),
        param('type').optional({nullable: true}).isString().withMessage('Name must be a string').isLength({min: 2}).withMessage('The type must contain 2 or more characters').optional({nullable: true}),
        param('bind').optional({nullable: true})
    ]
}