import {FC, useEffect, useState} from 'react';

import {IQuizResponse} from '../../interfaces/quiz.interface';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Outlet, useParams, useSearchParams} from 'react-router-dom';
import {companyActions, mainAction} from '../../Store/slice';
import {PaginationItem} from '../PaginationItem/PaginationItem';
import {Quiz, QuizActions, QuizForm, UniversalModalWindow} from '..';
import css from './quizList.module.css';

interface IProps {
    quizzes: IQuizResponse[]
    total_item: number,
    total_page: number,

}

const QuizzesList: FC<IProps> = ({quizzes, total_item, total_page}) => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {company_role} = useAppSelector(state => state.companyReducer);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const [query] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');
    const current_page = pageQueryParam !== null ? parseInt(pageQueryParam, 10) : 1;

    const selectedPage = (page: string | number) => {
        dispatch(mainAction.setSkip(page))
    }
    useEffect(() => {
        dispatch(companyActions.getUserRole({id: Number(id)}))

    }, [dispatch, id, query, pageQueryParam]);

    return (
        <>
            <div className={css.quizAction}>
                <PaginationItem total_page={total_page} total_item={total_item} current_page={current_page}
                                selectedPage={selectedPage}/>
                <QuizActions company_role={company_role} setModalVisible={setModalVisible}/>
            </div>

            <div className={css.QuizListWrapper}>
                {
                    quizzes.map(quiz => <Quiz key={quiz.id} quiz={quiz}/>)
                }
            </div>
            <Outlet/>

            <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                <QuizForm onClose={() => setModalVisible(false)}/>
            </UniversalModalWindow>

        </>
    );
};

export {QuizzesList};