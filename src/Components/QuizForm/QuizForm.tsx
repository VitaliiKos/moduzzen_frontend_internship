import {FC, useEffect, useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';

import {IQuizCreateRequest, IQuizQuestionCreateRequest} from '../../interfaces/quiz.interface';
import {FormInput} from '..';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {quizActions} from '../../Store/slice';
import {joiResolver} from '@hookform/resolvers/joi';
import {QuizValidator} from '../../validators';
import {QuizQuestionCreate} from '../QuizQuestionCreate/QuizQuestionCreate';


interface IProps {
    onClose: () => void
}

const QuizForm: FC<IProps> = ({onClose}) => {
    const formData: IQuizCreateRequest = {
        title: 'Quiz Title',
        description: 'Quiz Description',
        frequency_in_days: 7,
        company_id: 1,
        questions_data: [
            {
                question_text: 'Question 1',
                answers: [{answer_text: 'Answer 1', is_correct: true}, {answer_text: 'Answer 2', is_correct: false}]
            },
            {
                question_text: 'Question 2',
                answers: [{answer_text: 'Answer 1', is_correct: false}, {answer_text: 'Answer 2', is_correct: true}]
            }
        ]
    };

    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {skip} = useAppSelector(state => state.mainReducer);
    const {error} = useAppSelector(state => state.quizReducer);

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: {errors, isValid}
    } = useForm<IQuizCreateRequest>({
        mode: "all",
        resolver: joiResolver(QuizValidator)
    });
    const [quiz, setQuiz] = useState<IQuizCreateRequest>(formData)

    const onSubmit: SubmitHandler<IQuizCreateRequest> = async (quiz_data) => {
        quiz_data['company_id'] = Number(id)
        await dispatch(quizActions.createQuiz(quiz_data))
        reset()
        await dispatch(quizActions.getCompanyQuizzes({company_id: Number(id), query: {skip}}));
        onClose()
    };

    const addQuestion = () => {
        const newQuestion: IQuizQuestionCreateRequest = {
            question_text: '',
            answers: [],
        };

        setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions_data: [...prevQuiz.questions_data, newQuestion],
        }));
    };

    const addAnswer = (questionIndex: number) => {

        const newAnswer = {
            answer_text: '',
            is_correct: false,
        };

        setQuiz((prevQuiz) => {
            const current_quiz = getValues()
            if (!current_quiz.questions_data[questionIndex].answers) {
                current_quiz.questions_data[questionIndex].answers = []
            }
            current_quiz.questions_data[questionIndex].answers.push(newAnswer)
            return {...prevQuiz, questions_data: current_quiz.questions_data};
        });
    };
    useEffect(() => {
        const current_quiz = getValues()
        setValue(`title`, current_quiz.title);
        setValue(`description`, current_quiz.description);
        setValue(`frequency_in_days`, current_quiz.frequency_in_days);
        setValue(`questions_data`, current_quiz.questions_data);

    }, [quiz]);
    return (
        <div>
            <h2>Quiz Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput name={'title'} register={register}/>
                <FormInput name={'description'} register={register}/>
                <FormInput name={'frequency_in_days'} type={'number'} register={register}/>

                {quiz.questions_data.map((question, questionIndex) => (
                        <QuizQuestionCreate key={questionIndex} register={register} questionIndex={questionIndex}
                                            addAnswer={addAnswer} question={question}/>
                    )
                )}

                <button type="button" onClick={addQuestion}>
                    Add Question
                </button>
                {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
                {error && <div>{error.detail}</div>}
                <button disabled={!isValid} type="submit">Submit</button>
            </form>
        </div>
    );
};

export {QuizForm};


