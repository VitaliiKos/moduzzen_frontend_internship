import Joi from 'joi';

export const QuizValidator = Joi.object({
    title: Joi.string().regex(/^[A-Za-z0-9_ -]{3,20}$/).required().messages({
        'string.title': '"Title": can\'t be empty',
        'string.pattern.base': 'Title must consists letters or numbers. Length min 3 max 20 characters'
    }),
    description: Joi.string().regex(/^[A-Za-z0-9_ -]{3,128}$/).required().messages({
        'string.empty': '"Description": can\'t be empty',
        'string.pattern.base': 'Description must consists letters or numbers. Length min 3 max 128 characters'
    }),
    frequency_in_days: Joi.number().min(1).max(7).required().messages({
        'number.base': 'min.frequency_in_days <= 1 max.frequency_in_days >= 7',
        'number.min': 'frequency_in_days must be more than 0',
        'number.max': 'frequency_in_days must be less than 7',
    }),


    questions_data: Joi.array()
        .min(2)
        .items(
            Joi.object({
                question_text: Joi.string().regex(/^[A-Za-z0-9_ -]{1,50}$/).required()
                    .messages({
                        'string.pattern.base': 'The text of the question can consist of letters, numbers, spaces, "_" and "-" characters, and be between 1 and 50 characters long.',
                        'any.required': 'The question text field is required.',
                    }),
                answers: Joi.array()
                    .min(2)
                    .items(
                        Joi.object({
                            answer_text: Joi.string().regex(/^[A-Za-z0-9_ -]{1,20}$/).required().messages({
                                'string.pattern.base': 'The text of the question can consist of letters, numbers, spaces, "_" and "-" characters, and be between 1 and 50 characters long.',
                                'any.required': 'The answer field is required',
                            }),
                            is_correct: Joi.boolean().required().messages({
                                'any.required': 'The "is_correct" field is required.',
                            }),
                        })
                    )
                    .custom((answers, helpers) => {
                        const trueCount = answers.filter((answer: { is_correct: boolean }) => answer.is_correct === true).length;
                        if (trueCount !== 1) {
                            return helpers.message(
                                {custom: 'At least one answer must be marked as correct.',}
                                // 'Exactly one answer must be marked as correct.'
                            );
                        }
                        return answers;
                    }),
                    // .custom((answers, helpers) => {
                    //     if (!answers.some((answer: { is_correct: boolean }) => answer.is_correct === true)) {
                    //         return helpers.message({custom: 'At least one answer must be marked as correct.',});
                    //     }
                    //     return answers;
                    // }),
            })
        )
        .messages({
            'string.pattern.base': 'The text of the question can consist of letters, numbers, spaces, "_" and "-" characters, and be between 1 and 50 characters long.',
            'any.required': 'The question text field is required.',
            'number.max': 'frequency_in_days must be less than 7',
        }),
});
