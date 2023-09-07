import {Dispatch, FC, SetStateAction} from 'react';

import {
    IAnswerData,
    IQquestionData,
    IQuizData,
    IQuizFullResponse,
    IQuizQuestionFullResponse
} from '../../interfaces/quiz.interface';
import {FieldValues, UseFormRegister} from 'react-hook-form';
import {QuizQuestionAnswer} from '..';
import css from './quizQuestion.module.css';
import {useAppDispatch} from '../../hooks';
import {quizActions} from '../../Store/slice';

interface IProps {
    quiz_id: number
    question: IQuizQuestionFullResponse
    editQuiz: (item: IQuizData | IAnswerData | IQquestionData) => void
    questionsLength: number
    delQuestion: (quiz_id: number, question_id: number) => void
    delAnswer: (quiz_id: number, answer_id: number) => void
    register: UseFormRegister<IQuizFullResponse & FieldValues>,
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

const QuizQuestion: FC<IProps> = ({question, setModalVisible, editQuiz, questionsLength, delQuestion, quiz_id, register, delAnswer}) => {
    const dispatch = useAppDispatch();

    return (
        <>
            <ol className={css.quizQuestion} key={question.id}>
                <li>
                    <div className={css.editQuizItemQuestion}>

                        <div>
                            <h3>{question.question_text}</h3>
                        </div>

                        <div className={css.questionAction}>
                            <div className={css.updateIcon}>
                                <i className="fa-solid fa-pen"
                                   onClick={() => editQuiz({
                                       question: {question_text: question.question_text}, question_id: question.id
                                   })}>
                                </i>
                            </div>
                            <div className={css.delIcon} hidden={questionsLength <= 2}>
                                <i className="fa-solid fa-trash-can"
                                   onClick={() => delQuestion(quiz_id, question.id)}></i>
                            </div>
                        </div>

                    </div>
                    {question.answers.map((answer, index) =>
                        <QuizQuestionAnswer key={answer.id} question_id={question.id}
                                            answers_length={question.answers.length} answer={answer} editQuiz={editQuiz}
                                            quiz_id={quiz_id} register={register} delAnswer={delAnswer} index={index}/>
                    )}
                    <i className="fa-solid fa-plus" onClick={() => {
                        setModalVisible(true)
                        dispatch(quizActions.set_question_id(question.id))
                    }}></i>
                </li>
            </ol>

        </>
    );
};

export {QuizQuestion};