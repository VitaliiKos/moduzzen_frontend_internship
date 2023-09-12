import {FC} from 'react';
import {IValiableQuizzesResponse} from '../../interfaces';
import css from './avaliableQuiz.module.css';
import { useNavigate } from 'react-router-dom';

interface IProps {
    quiz: IValiableQuizzesResponse
}

const AvaliableQuiz: FC<IProps> = ({quiz: quiz_item}) => {
    const navigate = useNavigate();
    const {quiz, date} = quiz_item;
    return (
        <div className={css.avaliableQuizWrapper} onClick={()=> navigate(`/profile/my_company/${quiz.company_id}/company_quizzes/${quiz.id}`)}>
            <h3>{`${quiz.id}) ${quiz.title}`}</h3>
            <h3>Last completed time: {date.split('T')[0]}</h3>

        </div>
    );
};

export {AvaliableQuiz};