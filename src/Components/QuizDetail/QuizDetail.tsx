import {FC, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import {
    ButtonNavigate,
    QuizAnswerCreateForm,
    QuizForUpdate,
    QuizQuestion,
    QuizQuestionCreateForm,
    UniversalModalWindow
} from '..';
import {RouterEndpoints} from '../../routes';
import {
    IAnswerData,
    IQquestionData,
    IQuizData,
    IQuizFullResponse,
    IVoteDataRequest
} from '../../interfaces/quiz.interface';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {quizActions} from '../../Store/slice';
import css from './quizDetail.module.css';
import {useNavigate} from 'react-router-dom';

interface IProps {
    selected_quiz: IQuizFullResponse
}

const QuizDetail: FC<IProps> = ({selected_quiz}) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [quizItemForUpdate, setQuizItemForUpdate] = useState<IQuizData | IAnswerData | IQquestionData | null>(null);
    const navigate = useNavigate();
    const {skip} = useAppSelector(state => state.mainReducer);

    const {
        id,
        title,
        frequency_in_days,
        description,
        company_id,
        questions
    } = selected_quiz
    const dispatch = useAppDispatch();
    const {user_current_quiz_vote, question_id_for_add_answer, error} = useAppSelector(state => state.quizReducer);
    const {handleSubmit, formState: {errors}, register, reset} = useForm<IQuizFullResponse>();

    const quizVotting: SubmitHandler<object> = async (data) => {
        const output: {
            [key: string]: any
        } = {
            ...data
        }
        const filteredObject: string[] = Object.keys(output).filter(key => output[key] !== null)


        const resultObject: Record<string, number> = filteredObject.reduce((acc: Record<string, number>, item) => {
            const [key, value] = item.split('_');
            acc[key] = Number(value);
            return acc;
        }, {});

        const voteData: IVoteDataRequest = {
            vote_data: resultObject,
        };
        dispatch(quizActions.sendQuizVote({quiz_id: Number(id), company_id: Number(company_id), vote_data: voteData}));

        reset()
    };

    const reset_user_vote = () => {
        dispatch(quizActions.reset_current_vote());
    }
    const editQuiz = (item: IQuizData | IAnswerData | IQquestionData) => {
        setModalVisible(true);
        setQuizItemForUpdate(item)
    }
    const delAnswer = async (quiz_id: number, answer_id: number) => {
        await dispatch(quizActions.deleteQuizAnswer({quiz_id, answer_id}))
        dispatch(quizActions.getQuizById({quiz_id: Number(quiz_id)}))
    }
    const delQuestion = async (quiz_id: number, question_id: number) => {
        await dispatch(quizActions.deleteQuizQuestion({quiz_id, question_id}))
        dispatch(quizActions.getQuizById({quiz_id: Number(quiz_id)}))
    }
    const delQuiz = async (quiz_id: number) => {
        await dispatch(quizActions.deleteQuiz(quiz_id))
        await dispatch(quizActions.getCompanyQuizzes({company_id: Number(id), query: {skip}}));
        navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.myCompanies}/${company_id}/company_quizzes`)
    }

    useEffect(() => {

    }, [quizItemForUpdate]);
    return (
        <div className={css.quizDetailPage}>
            <div onClick={() => reset_user_vote()}><ButtonNavigate
                navigate_params={`/${RouterEndpoints.profile}/${RouterEndpoints.myCompanies}/${company_id}/company_quizzes`}
                button_title={'X'}/>
            </div>

            {user_current_quiz_vote ?
                <div className={css.quizWrapper}>
                    <h3>Total question: {user_current_quiz_vote.total_question}</h3>

                    <h3>Correct answers: {user_current_quiz_vote.total_answers}</h3>
                    <h3>Score: {user_current_quiz_vote.score}</h3>
                    <h3>Date: {user_current_quiz_vote.timestamp.split('T')[0]}</h3>
                </div>
                :
                <div className={css.quizWrapper}>
                    <div className={css.quizTitleBlock}>
                        <div className={css.editQuizItem}>
                            <h2>{title}</h2>
                            <h3>{description}</h3>
                            <h3>{frequency_in_days}</h3>
                        </div>
                        <div className={css.ActionIcon}>
                            <div className={css.updateIcon}>
                                <i className="fa-solid fa-pen"
                                   onClick={() => editQuiz({quiz: {title, description, frequency_in_days}})}></i>
                            </div>
                            <div className={css.delIcon}>
                                <i className="fa-solid fa-trash-can" onClick={() => delQuiz(id)}></i>
                            </div>
                        </div>
                    </div>
                    <div className={css.createQuestionButton}>
                        <i className="fa-solid fa-square-plus fa-fade" onClick={() => setModalVisible(true)}></i>
                    </div>

                    <form onSubmit={handleSubmit(quizVotting)} className={css.quizForm}>
                        {questions.map(question => <QuizQuestion key={question.id} question={question}
                                                                 editQuiz={editQuiz} delQuestion={delQuestion}
                                                                 quiz_id={id} questionsLength={questions.length}
                                                                 delAnswer={delAnswer} register={register}
                                                                 setModalVisible={setModalVisible}/>
                        )}

                        <div className={css.buttonSubmitWrapper}>
                            <button className={css.buttonSubmit}>Submit Quiz</button>
                        </div>
                        {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
                        {error && <div>{error.detail}</div>}
                    </form>
                </div>
            }


            {quizItemForUpdate &&
                <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                    <QuizForUpdate onClose={() => setModalVisible(false)} setQuizItemForUpdate={setQuizItemForUpdate}
                                   itemForUpdate={quizItemForUpdate} quiz_id={id}/>
                </UniversalModalWindow>
            }
            {question_id_for_add_answer &&
                <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                    <QuizAnswerCreateForm onClose={() => setModalVisible(false)}/>
                </UniversalModalWindow>
            }
            {(!quizItemForUpdate && !question_id_for_add_answer) &&
                <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                    <QuizQuestionCreateForm questions={questions} quiz_id={id}
                                            onClose={() => setModalVisible(false)}/>
                </UniversalModalWindow>}


        </div>
    );
};

export {QuizDetail};

