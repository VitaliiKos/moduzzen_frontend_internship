import {FC} from 'react';
import {FormInput} from '..';
import {SubmitHandler, useForm} from 'react-hook-form';
import {IQuizQuestionAnswerCreateRequest} from '../../interfaces/quiz.interface';
import {quizActions} from '../../Store/slice';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useParams} from 'react-router-dom';
import {joiResolver} from '@hookform/resolvers/joi';
import {QuizAnswerValidators} from '../../validators';

interface IProps {
    onClose: () => void
}

const QuizAnswerCreateForm: FC<IProps> = ({onClose}) => {
    const dispatch = useAppDispatch();
    const {question_id_for_add_answer} = useAppSelector(state => state.quizReducer);
    const {quiz_id} = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid}
    } = useForm<IQuizQuestionAnswerCreateRequest>(
        {
            mode: "all",
            resolver: joiResolver(QuizAnswerValidators)
        }
    );
    const onSubmit: SubmitHandler<IQuizQuestionAnswerCreateRequest> = async (answer_data) => {
        if (question_id_for_add_answer) {
            await dispatch(quizActions.createAnswer({answer_data, question_id: question_id_for_add_answer}))
        }
        reset()
        dispatch(quizActions.set_question_id(null))
        dispatch(quizActions.getQuizById({quiz_id: Number(quiz_id)}))
        onClose()
    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput name={`answer_text`} register={register} placeholder={`New Answer`}/>
                <FormInput name={`is_correct`} register={register} placeholder={`true / false`}/>
                {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
                <button disabled={!isValid} type="submit">Submit</button>
            </form>


        </div>
    );
};

export {QuizAnswerCreateForm};