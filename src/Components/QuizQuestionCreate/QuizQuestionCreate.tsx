import {FC} from 'react';
import {FieldValues, UseFormRegister} from 'react-hook-form';

import {FormInput} from '../FormInput/FormInput';
import {IQuizCreateRequest, IQuizQuestionCreateRequest} from '../../interfaces/quiz.interface';
import {QuizAnswerCreate} from '../QuizAnswerCreate/QuizAnswerCreate';
import css from './quizQuestionCreate.module.css';

interface IProps {
    questionIndex: number
    register: UseFormRegister<IQuizCreateRequest & FieldValues> | UseFormRegister<IQuizQuestionCreateRequest & FieldValues>
    addAnswer: (questionIndex: number) => void
    question: IQuizQuestionCreateRequest
}

const QuizQuestionCreate: FC<IProps> = ({questionIndex, register, question, addAnswer}) => {
    return (
        <div key={questionIndex} className={css.questionCard}>
            <FormInput name={`questions_data[${questionIndex}].question_text`} register={register}
                       placeholder={`Question ${questionIndex + 1}`}/>
            {question.answers.map((_, answerIndex) => (
                <QuizAnswerCreate answerIndex={answerIndex} key={answerIndex}
                                 register={register} name_path={`questions_data[${questionIndex}].`}/>
            ))}
            <button type="button" onClick={() => addAnswer(questionIndex)}>
                Add Answer
            </button>
        </div>
    );
};

export {QuizQuestionCreate};