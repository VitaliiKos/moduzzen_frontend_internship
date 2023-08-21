import {FC, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActivitiesActions} from '../../Store/slice';
import {InviteList} from '../../Components';

const MyRequestPage: FC = () => {
    const dispatch = useAppDispatch();
    const {requests, total_item, total_page} = useAppSelector(state => state.companyActivitiesReducer);
    const {skip} = useAppSelector(state => state.mainReducer);

    const [query] = useSearchParams({page: '1'});
    const {id} = useParams();

    useEffect(() => {
        dispatch(companyActivitiesActions.getMyRequests({query: {skip}}));
    }, [dispatch, query, skip, id]);


    return (
        <>
            <InviteList invites={requests} total_item={total_item} total_page={total_page} current_company_id={null}/>
        </>
    );
};

export {MyRequestPage};