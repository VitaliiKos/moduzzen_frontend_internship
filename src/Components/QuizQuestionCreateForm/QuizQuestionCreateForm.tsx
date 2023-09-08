import {FC, useEffect, useState} from 'react';
import {FormInput, QuizAnswerCreate} from '..';
import {IQuizQuestionCreateRequest, IQuizQuestionFullResponse} from '../../interfaces/quiz.interface';
import {SubmitHandler, useForm} from 'react-hook-form';
import {joiResolver} from '@hookform/resolvers/joi';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {quizActions} from '../../Store/slice';
import { QuizQuestionValidators } from '../../validators';

interface IProps {
    questions: IQuizQuestionFullResponse[];
    onClose: () => void
    quiz_id: number
}

const formData: IQuizQuestionCreateRequest = {
    question_text: 'New Question',
    answers: [{answer_text: 'New Answer 1', is_correct: true}, {answer_text: 'New Answer 2', is_correct: false}]
};
const QuizQuestionCreateForm: FC<IProps> = ({ onClose, quiz_id}) => {
    const {error} = useAppSelector(state => state.quizReducer);
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: {errors, isValid}
    } = useForm<IQuizQuestionCreateRequest>(
        {
            mode: "all",
            resolver: joiResolver(QuizQuestionValidators)
        }
    );
    const [quizQuestion, setQuizQuestion] = useState<IQuizQuestionCreateRequest>(formData)

    const onSubmit: SubmitHandler<IQuizQuestionCreateRequest> = async (question_data) => {
        await dispatch(quizActions.createQuizQuestion({question_data, quiz_id}))
        reset()
        dispatch(quizActions.getQuizById({quiz_id: Number(quiz_id)}))
        onClose()
    };

    const addAnswer = () => {
        const newAnswer = {
            answer_text: '',
            is_correct: false,
        };
        setQuizQuestion((prevQuiz) => ({
            ...prevQuiz,
            answers: [...prevQuiz.answers, newAnswer],
        }));

        const currentQuestion = getValues();
        currentQuestion.answers.push(newAnswer);
    };
    useEffect(() => {
        const current_question = getValues()
        setValue(`question_text`, current_question.question_text);
        setValue(`answers`, current_question.answers);
    }, [quizQuestion, setValue, dispatch, getValues]);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput name={`question_text`} register={register}
                           placeholder={`Question Question 000`}/>
                {quizQuestion.answers.map((_, answerIndex) => (
                    <QuizAnswerCreate answerIndex={answerIndex} key={answerIndex} register={register}/>
                ))}
                <button type="button" onClick={() => addAnswer()}> Add Answer</button>

                {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
                {error && <div>{error.detail}</div>}
                <button disabled={!isValid} type="submit">Submit</button>

            </form>
        </div>
    );
};

export {QuizQuestionCreateForm};