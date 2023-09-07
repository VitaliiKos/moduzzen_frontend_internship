import Joi from 'joi';

export const QuizQuestionValidators = Joi.object({
    question_text: Joi.string().regex(/^[A-Za-z0-9_ -]{3,50}$/).required().messages({
        'string.pattern.base': 'The text of the question can consist of letters, numbers, spaces, "_" and "-" characters, and be between 3 and 50 characters long.',
        'any.required': 'The question text field is required.',

    }),
    answers: Joi.array()
        .min(2)
        .items(
            Joi.object({
                answer_text: Joi.string().regex(/^[A-Za-z0-9_ -]{3,20}$/).required().messages({
                    'string.pattern.base': 'The text of the question can consist of letters, numbers, spaces, "_" and "-" characters, and be between 3 and 20 characters long.',
                    'any.required': 'The answer field is required',
                }),
                is_correct: Joi.boolean().required().messages({
                    'any.required': 'The "is_correct" field is required.',
                }),
            }).messages({
                'array.min': 'At least 2 answers are required.',
                'array.base': 'Answers must be an array.',
            })
        )
        .custom((answers, helpers) => {
            const trueCount = answers.filter((answer: {
                is_correct: boolean
            }) => answer.is_correct === true).length;
            if (trueCount !== 1) {
                return helpers.message(
                    {custom: 'At least one answer must be marked as correct.',}
                );
            }
            return answers;
        }).messages({
            'array.custom': 'Custom message for the answers array validation.',
        }),
});
