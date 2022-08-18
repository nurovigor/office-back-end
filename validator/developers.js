import {body} from 'express-validator';

export const developerValidationRules = () => {
    return [
        body('firstName')
            .isAlphanumeric('en-US')
            .withMessage('firstName should be alphanumeric')
            .isLength({
                min: 1,
                max: 25
            }).withMessage('firstName should not be empty, should be more than one and less than 50 character')
            .trim(),
        body('lastName')
            .isAlphanumeric('en-US')
            .withMessage('lastName should be alphanumeric')
            .isLength({
                min: 1,
                max: 25
            }).withMessage('lastName should not be empty, should be more than one and less than 50 character')
            .trim(),
        body('phone')
            .exists()
            .withMessage('Phone is required')
            .isMobilePhone('ru-RU', {strictMode: true})
            .withMessage('Phone number must have 11 digits and the format (+79889337755)')
            .trim(),
    ]
}