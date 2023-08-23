import {FC, useEffect} from 'react';
import {useParams, useSearchParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActions} from '../../Store/slice';
import {CompanyList} from '../../Components';

const FindCompany: FC = () => {
    const dispatch = useAppDispatch();
    const {found_companies, total_page, total_item} = useAppSelector(state => state.companyReducer);
    const {skip} = useAppSelector(state => state.mainReducer);

    const [query] = useSearchParams({page: '1'});
    const {id} = useParams();

    useEffect(() => {
        dispatch(companyActions.find_companies({query: {skip}}));
    }, [dispatch, query, skip, id]);
    return (
        <div>
            <CompanyList companies={found_companies} total_page={total_page} total_item={total_item} searc_status={true}/>
        </div>
    );
};

export {FindCompany};