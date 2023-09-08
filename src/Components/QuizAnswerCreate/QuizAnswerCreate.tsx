import {FC} from 'react';
import {FieldValues, UseFormRegister} from 'react-hook-form';

import {IQuizCreateRequest, IQuizQuestionCreateRequest} from '../../interfaces/quiz.interface';
import {FormInput} from '../FormInput/FormInput';
import css from './quizAnswerCreate.module.css';

interface IProps {
    answerIndex: number
    register: UseFormRegister<IQuizCreateRequest & FieldValues>  | UseFormRegister<IQuizQuestionCreateRequest & FieldValues>
    name_path?:string
}

const QuizAnswerCreate: FC<IProps> = ({answerIndex, register,name_path=''}) => {
    return (
        <div key={answerIndex} className={css.answerBlock}>
            <FormInput name={`${name_path}answers[${answerIndex}].answer_text`}
                       register={register} placeholder={`Answer ${answerIndex + 1}`}/>
            <FormInput name={`${name_path}.answers[${answerIndex}].is_correct`}
                       register={register} placeholder={`true / false`} type={'checkBox'}/>
        </div>
    );
};

export {QuizAnswerCreate};