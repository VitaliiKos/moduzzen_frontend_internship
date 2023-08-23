import {FC} from 'react';
import {useAppDispatch} from '../../hooks';
import {useSearchParams} from 'react-router-dom';
import {companyActions} from '../../Store/slice';
import {ICompany, IMyCompany} from '../../interfaces';
import {Company} from '../Company/Company';
import {PaginationItem} from '../PaginationItem/PaginationItem';
import css from './companyList.module.css';

interface IProps {
    companies: ICompany[] | IMyCompany[],
    total_item: number,
    total_page: number,
    searc_status: boolean

}

const CompanyList: FC<IProps> = ({companies, total_item, total_page, searc_status}) => {
    const dispatch = useAppDispatch();

    const [query] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');
    const current_page = pageQueryParam !== null ? parseInt(pageQueryParam, 10) : 1;

    const selectedPage = (page: string | number) => {
        dispatch(companyActions.setSkip(page))
    }


    return (
        <div className={css.companyListWrapper}>
            <h3>Total items {total_item}</h3>
            <div className={css.paginationSelectedButton}>
                <PaginationItem total_page={total_page} total_item={total_item} current_page={current_page}
                                selectedPage={selectedPage}
                />
            </div>
            <div className={css.companyList}>
                {
                    companies.map(company => <Company key={company.id} company={company} searc_status={searc_status}/>)
                }
            </div>
        </div>
    );
};

export {CompanyList};