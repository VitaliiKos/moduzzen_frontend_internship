import {FC} from 'react';
import {useAppDispatch} from '../../hooks';
import {useSearchParams} from 'react-router-dom';
import {companyActions} from '../../Store/slice';
import {ICompany} from '../../interfaces';
import {Company} from '../Company/Company';
import {PaginationItem} from '../PaginationItem/PaginationItem';
import css from './companyList.module.css';

interface IProps {
    companies: ICompany[],
    total_item: number,
    total_page: number
}

const CompanyList: FC<IProps> = ({companies, total_item, total_page}) => {
    const dispatch = useAppDispatch();

    const [query] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');
    const current_page = pageQueryParam !== null ? parseInt(pageQueryParam, 10) : 1;

    const selectedPage = (page: string | number) => {
        dispatch(companyActions.setSkip(page))
    }

    const filteredCompanies = companies.filter(company => company.status === true);


    return (
        <div className={css.companyListWrapper}>
            <div className={css.paginationSelectedButton}>
                    <PaginationItem total_page={total_page} total_item={total_item} current_page={current_page}
                                    selectedPage={selectedPage}
                    />
            </div>
            <div className={css.companyList}>
                {
                    filteredCompanies.map(company => <Company key={company.id} company={company} />)
                }
            </div>
        </div>
    );
};

export {CompanyList};