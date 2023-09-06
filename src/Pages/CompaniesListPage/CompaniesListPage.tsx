import {FC, useEffect} from 'react';

import {CompanyList} from '../../Components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActions} from '../../Store/slice';
import css from './companiesListPage.module.css';
import {useSearchParams} from 'react-router-dom';

const CompaniesListPage: FC = () => {
    const dispatch = useAppDispatch();
    const [query] = useSearchParams({page: '1'});

    const {companies, total_page, total_item, skip} = useAppSelector((state) => state.companyReducer);

    useEffect(() => {
        dispatch(companyActions.getAll({query: {skip}}));
    }, [dispatch, skip, query]);

    return (
        <div className={css.companyListWrapper}>
            <CompanyList companies={companies} total_page={total_page} total_item={total_item} search_status={false}/>
        </div>
    );
};


export {CompaniesListPage};