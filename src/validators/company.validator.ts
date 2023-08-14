import Joi from 'joi';

export const companyValidator = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z]\w{1,19}$/).required().messages({
        'string.empty': '"Username": can\'t be empty',
        'string.pattern.base': 'Username must start with letter, and consists only letters. Length min 2 max 20 characters'
    }),
    email: Joi.string().regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).messages({
        'string.pattern.base': 'The email should look like this: testmail@gmail.com or testmail@gmail.com.de'
    }).required(),
    phone: Joi.string().regex(/^(\d{1,2})?\d{3}?\d{3}?\d{4}$/).messages({
        'string.pattern.base': 'The phone number should look like this: 380671112233 or 0671112233'
    }),
    status: Joi.boolean()


});

