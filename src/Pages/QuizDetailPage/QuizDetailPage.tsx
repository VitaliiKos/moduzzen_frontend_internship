import {FC, useEffect} from 'react';

import {QuizDetail} from '../../Components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useParams} from 'react-router-dom';
import {quizActions} from '../../Store/slice';

const QuizDetailPage: FC = () => {
    const dispatch = useAppDispatch();
    const {selected_quiz, error} = useAppSelector(state => state.quizReducer);
    const {quiz_id} = useParams();


    useEffect(() => {
        dispatch(quizActions.getQuizById({quiz_id: Number(quiz_id)}))
    }, [quiz_id, dispatch]);


    if (!selected_quiz) {
        return (
            <div>{error && <h3>{error.detail}</h3>}</div>
        );
    }

    return (
        <>
            <QuizDetail selected_quiz={selected_quiz}/>
        </>
    );
};

export {QuizDetailPage};