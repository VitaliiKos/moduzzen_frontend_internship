import Joi from 'joi';

export const profileValidator = Joi.object({
    email: Joi.string().regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).messages({
        'string.pattern.base': 'The email should look like this: testmail@gmail.com or testmail@gmail.com.de'
    }).required(),
    username: Joi.string().regex(/^[a-zA-Z]\w{1,19}$/).required().messages({
        'string.empty':'"Username": can\'t be empty',
        'string.pattern.base': 'Username must start with letter, and consists only letters. Length min 2 max 20 characters'
    }),
    age: Joi.number().min(16).required().messages({
        'number.base':'You must be over 16! '
    }),
    phone_number: Joi.string().regex(/^(\d{1,2})?\d{3}?\d{3}?\d{4}$/).messages({
        'string.pattern.base': 'The phone number should look like this: 380671112233 or 0671112233'
    }),
    city: Joi.string().regex(/^[a-zA-ZА-яёЁіІїЇґҐ]{1,32}$/).required().messages({
        'string.empty':'"city": can\'t be empty',
        'string.pattern.base':'"city": Only letters. min.1 letter max.32 letters',
    }),
});

