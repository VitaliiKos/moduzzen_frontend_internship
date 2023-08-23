import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useParams, useSearchParams} from 'react-router-dom';
import {companyActivitiesActions} from '../../Store/slice';
import {MembersList} from '../../Components';

const CompanyInvitationsPage: FC = () => {
    const dispatch = useAppDispatch();
    const {company_invites, total_item, total_page} = useAppSelector(state => state.companyActivitiesReducer);
    const {skip} = useAppSelector(state => state.mainReducer);

    const [query] = useSearchParams({page: '1'});
    const {id} = useParams();

    useEffect(() => {
        dispatch(companyActivitiesActions.getCompanyInvites({company_id: Number(id), query: {skip}}));
    }, [dispatch, query, skip, id]);

    return (
        <>
            <MembersList members={company_invites} total_item={total_item} total_page={total_page}
                         company_id={Number(id)}/>
        </>
    );
};

export {CompanyInvitationsPage};