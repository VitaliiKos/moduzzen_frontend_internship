import {FC} from 'react';
import {FieldValues, UseFormRegister} from 'react-hook-form';

import {FormInput} from '..';
import {
    IAnswerData,
    IQquestionData,
    IQuizData,
    IQuizFullResponse,
    IQuizQuestionAnswerFullResponse
} from '../../interfaces/quiz.interface';
import css from './quizQuestionAnswer.module.css';

interface IProps {
    answer: IQuizQuestionAnswerFullResponse
    question_id: number
    answers_length: number
    editQuiz: (item: IQuizData | IAnswerData | IQquestionData) => void
    delAnswer: (quiz_id: number, answer_id: number) => void
    register: UseFormRegister<IQuizFullResponse & FieldValues>,
    quiz_id: number
    index: number
}

const QuizQuestionAnswer: FC<IProps> = ({answer, index, question_id, answers_length, quiz_id, delAnswer, register, editQuiz}) => {
    return (
        <div className={css.choseInputWrapper} key={answer.id}>
            <FormInput name={`${question_id}_${answer.id}`}
                       register={register} type={'radio'}/>
            <div className={css.editQuizItemQuestion}>
                <div>
                    <h4> {index + 1}) {answer.answer_text}</h4>
                </div>
                <div className={css.updateIcon}>
                    <i className="fa-solid fa-pen"
                       onClick={() => editQuiz({
                           answer: {
                               answer_text: answer.answer_text,
                               is_correct: answer.is_correct
                           }, question_id: question_id, answer_id: answer.id
                       })}>
                    </i>
                </div>
                <div hidden={answers_length <= 2} className={css.delIcon}>
                    <i className={`fa-solid fa-trash-can `} onClick={() => delAnswer(quiz_id, answer.id)}></i>
                </div>
            </div>
        </div>
    );
};

export {QuizQuestionAnswer};