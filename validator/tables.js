import {body} from 'express-validator';

export const updateTableValidationRules = () => {
    return [
        body('developer').exists().isString().optional({nullable: true}).withMessage('developer id must be string or null'),
        body('pc').exists().withMessage('field pc must be exist').isString().optional({nullable: true}).withMessage('pc name must be string or null'),
        body('monitor').isString().optional({nullable: true}).withMessage('monitor id must be string or null'),
        body('keyboard').isString().optional({nullable: true}).withMessage('keyboard id must be string or null'),
        body('mouse').isString().optional({nullable: true}).withMessage('mouse id must be string or null'),
        body('microphone').isString().optional({nullable: true}).withMessage('microphone id must be string or null'),
        body('headphones').isString().optional({nullable: true}).withMessage('headphones id must be string or null'),
        body('camera').isString().optional({nullable: true}).withMessage('camera id must be string or null'),
    ]
}

export const createTableValidationRules = () => {
    return [
        body('number').isString().withMessage('Number is required'),
        body('openSpaceNumber').isString().withMessage('OpenSpace number is required'),
        ...updateTableValidationRules()
    ]
}
