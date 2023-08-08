import Joi from 'joi';

export const authValidator = Joi.object({
    password: Joi.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])\S{8,20}$/).messages({
        'string.pattern.base': 'Password must consists from 1 uppercase, 1 lowercase, 1 number, 1 non-alphanumeric. Length min 8 max 20 chs'
    }).required(),
    email: Joi.string().regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/).messages({
        'string.pattern.base': 'The email should look like this: testmail@gmail.com or testmail@gmail.com.de'
    }).required(),
});

