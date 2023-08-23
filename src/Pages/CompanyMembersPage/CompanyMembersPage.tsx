import {FC, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActivitiesActions} from '../../Store/slice';
import {MembersList} from '../../Components';


const CompanyMembersPage: FC = () => {
    const dispatch = useAppDispatch();
    const {members, total_page, total_item} = useAppSelector(state => state.companyActivitiesReducer);
    const {skip} = useAppSelector(state => state.mainReducer);

    const [query] = useSearchParams({page: '1'});
    const {id} = useParams();




    useEffect(() => {
        dispatch(companyActivitiesActions.getMembers({company_id: Number(id), query: {skip}}));
    }, [dispatch, query, skip, id]);

    return (
        <>
            <MembersList members={members} total_item={total_item} total_page={total_page} company_id={Number(id)}/>
        </>
    );
};

export {CompanyMembersPage};

