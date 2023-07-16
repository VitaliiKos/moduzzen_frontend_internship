import {FC} from 'react';
import {Outlet} from 'react-router-dom';
import {Company} from '../../Components/Company/Company';

import {companies} from '../../temporaryData';
import css from './companiesListPage.module.css';

const CompaniesListPage: FC = () => {

    return (
        <div className={css.companyListWrapper}>
            <div className={css.companyListTitle}>
                <h3>CompaniesListPage</h3>
            </div>
            <div className={css.companyList}>
                {
                    companies.map(company => <Company key={company.id} company={company}/>)
                }
            </div>

            <div className={css.currentCompanyWrapper}>
                <Outlet/>
            </div>

        </div>
    );
};

export {CompaniesListPage};