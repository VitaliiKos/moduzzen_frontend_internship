import {FC, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {quizActions} from '../../Store/slice';
import {QuizzesList} from '../../Components/QuizzesList/QuizzesList';

const CompanyQuizzesPage: FC = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();

    const {company_quizzes, total_page, total_item, error} = useAppSelector(state => state.quizReducer);
    const {skip} = useAppSelector(state => state.mainReducer);
    const [query] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');


    useEffect(() => {
        dispatch(quizActions.getCompanyQuizzes({company_id: Number(id), query: {skip}}));
    }, [dispatch, query, id, skip,pageQueryParam]);

    return (
        <>
            <QuizzesList quizzes={company_quizzes} total_item={total_item} total_page={total_page}/>
            {
                error &&
                error.detail
            }
        </>);
};

export {CompanyQuizzesPage};