import {FC, useState} from 'react';

import {IQuizResponse} from '../../interfaces/quiz.interface';
import css from './quiz.module.css';
import {Link} from 'react-router-dom';
import {ActionConfirmation, UniversalModalWindow} from '..';
import {useAppDispatch} from '../../hooks';
import {quizActions} from '../../Store/slice';

interface IProps {
    quiz: IQuizResponse,

}

const Quiz: FC<IProps> = ({quiz}) => {
    const {id, description, title} = quiz
    const dispatch = useAppDispatch();
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const handleConfirmation = async () => {
        await dispatch(quizActions.deleteQuiz(id));


    }

    return (
        <div className={css.container}>

            <div className={css.card}>

                <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                    <ActionConfirmation onClose={() => setModalVisible(false)}
                                        handleYes={handleConfirmation}/>
                </UniversalModalWindow>

                <div className={css.box}>
                    <div className={css.content}>
                        <h2>{id}</h2>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <Link to={`${id}`} className={css.info}>Read More</Link>
                    </div>
                </div>
            </div>
        </div>


    );
};

export {Quiz};