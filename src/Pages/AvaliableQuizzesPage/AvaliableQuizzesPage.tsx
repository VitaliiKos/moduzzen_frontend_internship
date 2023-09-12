import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useSearchParams} from 'react-router-dom';
import {analyticsActions} from '../../Store/slice';
import { AvaliableQuiz } from '../../Components';

const AvaliableQuizzesPage: FC = () => {

    const dispatch = useAppDispatch();
    const {listOfAvaliableQuizzes} = useAppSelector(state => state.analyticsReducer);
    const {skip} = useAppSelector(state => state.mainReducer);
    const [query] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');

    useEffect(() => {
        dispatch(analyticsActions.listOfAllAvailableQuizzes({query: {skip}}))
    }, [query, dispatch, skip, pageQueryParam]);
    return (
        <div>
            <h3>AvaliableQuizzesPage</h3>
            {
                listOfAvaliableQuizzes.map( (quiz, index) =>  <AvaliableQuiz key={index} quiz={quiz}/>)
            }
        </div>
    );
}

export {AvaliableQuizzesPage};