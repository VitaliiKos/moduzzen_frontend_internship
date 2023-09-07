import Joi from 'joi';

export const QuizAnswerValidators = Joi.object({
    answer_text: Joi.string().regex(/^[A-Za-z0-9_ -]{3,20}$/).required().messages({
        'string.pattern.base': 'The text of the question can consist of letters, numbers, spaces, "_" and "-" characters, and be between 3 and 20 characters long.',
        'any.required': 'The answer field is required',
    }),
    is_correct: Joi.boolean().required().messages({
        'any.required': 'The "is_correct" field is required.',
    })
});
