import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useParams, useSearchParams} from 'react-router-dom';
import {companyActivitiesActions} from '../../Store/slice';
import { InviteList } from '../../Components';

const MyInvitesPage: FC = () => {
    const dispatch = useAppDispatch();
    const {invites, total_item, total_page} = useAppSelector(state => state.companyActivitiesReducer);
    const {skip} = useAppSelector(state => state.mainReducer);

    const [query] = useSearchParams({page: '1'});
    const {id} = useParams();

    useEffect(() => {
        dispatch(companyActivitiesActions.getMyInvites({query: {skip}}));
    }, [dispatch, query, skip, id]);

    return (
        <>
            <InviteList invites={invites} total_item={total_item} total_page={total_page} current_company_id={null}/>
        </>
    );
};

export {MyInvitesPage};