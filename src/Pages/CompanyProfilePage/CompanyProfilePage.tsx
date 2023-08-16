import {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActions} from '../../Store/slice';
import css from './companyProfilePage.module.css';
import {RouterEndpoints} from '../../routes';
import {CompanyCreateForm, UniversalModalWindow} from '../../Components';

const CompanyProfilePage: FC = () => {

        const [isModalVisible, setModalVisible] = useState<boolean>(false);
        const navigate = useNavigate();
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
                <div className={css.company_img}>
                    <img
                        src="https://tradingsoftwaremarketplace.net/wp-content/uploads/2021/10/what-is-a-company-scaled-2.jpg"
                        alt=""/>
                </div>

                <h4>{selected_company.id}. {selected_company.name}</h4>
                <h4>Email: {selected_company.email}</h4>
                <h4>Phone: {selected_company.phone}</h4>
                <h4>Active status: {selected_company.status ? 'Visable' : 'Invisable'}</h4>
                <h4>Your role: {company_role}</h4>
                {
                    company_role!.toLowerCase() === 'owner' &&
                    <div>
                        <button onClick={() => setModalVisible(true)}>Update</button>
                        <button onClick={() => {
                            dispatch(companyActions.deleteCompany({id: Number(selected_company.id)}))
                            navigate(`/${RouterEndpoints.company}`)
                        }}>Delte
                        </button>
                    </div>

                }
                <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                    <CompanyCreateForm onClose={() => setModalVisible(false)}/>
                </UniversalModalWindow>
            </div>
        );
    }
;

export {CompanyProfilePage};