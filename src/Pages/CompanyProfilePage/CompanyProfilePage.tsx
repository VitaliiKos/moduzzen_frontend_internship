import {FC, useEffect} from 'react';
import {Outlet, useParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActions} from '../../Store/slice';
import {CompanyProfile, SwitchComponent} from '../../Components';
import {CompanyActions} from "../../Components/CompanyActions/CompanyActions";
import css from './companyProfilePage.module.css';

const CompanyProfilePage: FC = () => {
        const dispatch = useAppDispatch();
        const {selected_company, company_role, error} = useAppSelector(state => state.companyReducer);
        const {id} = useParams();


        useEffect(() => {
            dispatch(companyActions.getById({'id': Number(id)}))
            dispatch(companyActions.getUserRole({id: Number(id)}))
        }, [id, dispatch]);


        if (!selected_company) {
            return (
                <div>{error && <h3>{error.detail}</h3>}</div>
            );
        }

        return (
            <div className={css.companyProfileWrapper}>
                <div className={css.companyDescribe}>
                    <CompanyProfile selected_company={selected_company}/>
                    <CompanyActions company_role={company_role} company_id={Number(id)}/>

                </div>
                <div className={css.company_img}>
                    <img
                        src="https://tradingsoftwaremarketplace.net/wp-content/uploads/2021/10/what-is-a-company-scaled-2.jpg"
                        alt=""/>
                </div>

                <div className={css.membersWrapper}>
                    <Outlet/>
                </div>

            </div>
        );
    }
;

export {CompanyProfilePage};