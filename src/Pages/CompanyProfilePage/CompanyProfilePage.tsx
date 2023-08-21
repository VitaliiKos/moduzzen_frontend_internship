import {FC, useEffect} from 'react';
import {Outlet, useNavigate, useParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActions} from '../../Store/slice';
import css from './companyProfilePage.module.css';
import {CompanyProfile} from '../../Components';

const CompanyProfilePage: FC = () => {
        const navigate = useNavigate();
        const dispatch = useAppDispatch();
        const {selected_company, error } = useAppSelector(state => state.companyReducer);
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
        const show_members = () => {
            navigate('company_members')
        }

        const show_candidates = () => {
            navigate('company_candidates')
        }
        const show_invites = () => {
            navigate('company_invites')
        }

        return (
            <div className={css.companyProfileWrapper}>
                <div className={css.companyDescribe}>
                    <CompanyProfile selected_company={selected_company}/>

                    <div>
                        <button onClick={() => show_members()}>Show members</button>
                        <button onClick={() => show_candidates()}>Show canditates</button>
                        <button onClick={() => show_invites()}>Show Invites</button>
                    </div>
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