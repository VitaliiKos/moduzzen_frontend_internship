import {FC, useEffect, useState} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActivitiesActions} from '../../Store/slice';
import {ButtonInvite, UsersList} from '../../Components';

const CompanyCandidatesPage: FC = () => {

    const [user_id, setUser_id] = useState<number| null>(null);
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {candidates, total_page, total_item, error} = useAppSelector(state => state.companyActivitiesReducer);
    const {skip} = useAppSelector(state => state.mainReducer);

    const [query] = useSearchParams({page: '1'});

    useEffect(() => {
        dispatch(companyActivitiesActions.getPotentialCandidates({company_id: Number(id), query: {skip}}));
    }, [dispatch, query, id, skip]);

    return (
        <>
            <UsersList users={candidates} total_item={total_item} total_page={total_page} setUser_id={setUser_id}>
                <ButtonInvite  company_id={Number(id)} user_id={user_id}/>
            </UsersList>
            {
                error &&
                error.detail
            }
        </>
    );
};

export {CompanyCandidatesPage};

