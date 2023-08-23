import {FC, useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {useParams, useSearchParams } from 'react-router-dom';
import { companyActivitiesActions } from '../../Store/slice';
import { MembersList } from '../../Components';

const CompanyAdminsPage: FC = () => {
    const dispatch = useAppDispatch();
    const {admins, total_page, total_item} = useAppSelector(state => state.companyActivitiesReducer);
    const {skip} = useAppSelector(state => state.mainReducer);

    const [query] = useSearchParams({page: '1'});
    const {id} = useParams();

    useEffect(() => {
        dispatch(companyActivitiesActions.getCompanyAdmins({company_id: Number(id), query: {skip}}));
    }, [dispatch, query, skip, id, total_item]);


    return (
        <>
            <MembersList members={admins} total_item={total_item} total_page={total_page} company_id={Number(id)}/>
        </>
    );
};

export {CompanyAdminsPage};