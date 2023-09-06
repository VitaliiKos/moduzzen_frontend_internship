import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FormInput} from '..';
import {
    IAnswerData, IQquestionData,
    IQuizAnswerForUpdate, IQuizData,
    IQuizForUpdate,
    IQuizQuestionForUpdate
} from '../../interfaces/quiz.interface';
import {quizActions} from '../../Store/slice';

interface IProps {
    onClose: () => void
    quiz_id: number
    itemForUpdate: IAnswerData | IQquestionData | IQuizData
    setQuizItemForUpdate: Dispatch<SetStateAction<IQuizData | IAnswerData | IQquestionData | null>>
}

const QuizForUpdate: FC<IProps> = ({onClose, quiz_id, setQuizItemForUpdate, itemForUpdate}) => {
        const dispatch = useAppDispatch();
        const [fieldName, setFieldName] = useState<string[]>([])
        const [isModalVisible, setModalVisible] = useState<boolean>(false);
        const {
            handleSubmit,
            setValue,
            formState: {errors},
            register,
            reset
        } = useForm<IQuizForUpdate | IQuizQuestionForUpdate | IQuizAnswerForUpdate>();

        useEffect(() => {
            if (itemForUpdate) {
                switch (Object.keys(itemForUpdate)[0]) {
                    case 'quiz':
                        if ('quiz' in itemForUpdate) {
                            const {quiz: {title, frequency_in_days, description}} = itemForUpdate
                            setFieldName(Object.keys(itemForUpdate.quiz))
                            setValue('title', title)
                            setValue('description', description)
                            setValue('frequency_in_days', frequency_in_days)
                        }
                        break;
                    case 'question':
                        if ('question' in itemForUpdate) {
                            const {question: {question_text}} = itemForUpdate
                            setFieldName(Object.keys(itemForUpdate.question))
                            setValue('question_text', question_text)
                        }
                        break;
                    case 'answer':
                        if ('answer' in itemForUpdate) {
                            const {answer: {answer_text, is_correct}} = itemForUpdate
                            setFieldName(Object.keys(itemForUpdate.answer))
                            setValue('answer_text', answer_text)
                            setValue('is_correct', is_correct)
                        }
                        break;

                }
            }

        }, [isModalVisible, itemForUpdate, setValue]);
        const update: SubmitHandler<IQuizForUpdate | IQuizQuestionForUpdate | IQuizAnswerForUpdate> = async (data) => {

            if ('quiz' in itemForUpdate) {
                const quizData: IQuizForUpdate = data as IQuizForUpdate;
                if (itemForUpdate.quiz) {
                    await dispatch(quizActions.updateQuiz({quiz_id, quiz_data: quizData}))

                }
            } else if ('question' in itemForUpdate) {
                const questionData: IQuizQuestionForUpdate = data as IQuizQuestionForUpdate;
                if (itemForUpdate.question) {
                    await dispatch(quizActions.updateQuizQuestion({question_id: itemForUpdate.question_id, question_data: questionData}))
                }
            } else if ('answer' in itemForUpdate) {
                const answerData: IQuizAnswerForUpdate = data as IQuizAnswerForUpdate;
                if (itemForUpdate.answer) {
                    await dispatch(quizActions.updateQuizAnswer({question_id: itemForUpdate.question_id,answer_id:itemForUpdate.answer_id,  answer_data: answerData}))
                }
            }
            dispatch(quizActions.getQuizById({quiz_id: Number(quiz_id)}))
            reset()
            setQuizItemForUpdate(null)
            setModalVisible(false);
            onClose()

        };

        return (
            <div>
                <h3>QuizForUpdate</h3>
                {
                    itemForUpdate &&
                    <form onSubmit={handleSubmit(update)}>
                        {
                            fieldName &&
                            fieldName.map((field, index) =>
                                <FormInput key={index} name={field} register={register}/>
                            )
                        }
                        <button>Save</button>
                    </form>
                }
            </div>
        );
    }
;

export {QuizForUpdate};

