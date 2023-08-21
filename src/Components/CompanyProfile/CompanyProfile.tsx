import {FC, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {ICompany} from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { companyActions } from '../../Store/slice';
import { RouterEndpoints } from '../../routes';
import {CompanyCreateForm, UniversalModalWindow} from '../../Components';

interface IProps {
    selected_company: ICompany
}

const CompanyProfile: FC<IProps> = ({selected_company}) => {
    const {id, name, email, status, phone} = selected_company;
    const {company_role} = useAppSelector(state => state.companyReducer);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const navigate = useNavigate();


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(companyActions.getUserRole({id: Number(id)}))
    }, [id, dispatch]);
    const update =(selected_company:ICompany)=>{
        dispatch(companyActions.setCompanyForUpdate(selected_company))
        setModalVisible(true)
    }

    return (
        <div>
            <h3>CompanyProfile</h3>
            <h4>{id}. {selected_company.name}</h4>
            <h4>Name: {name}</h4>
            <h4>Email: {email}</h4>
            <h4>Phone: {phone}</h4>
            <h4>Active status: {status ? 'Visable' : 'Invisable'}</h4>
            <h4>Your role: {company_role}</h4>
            {
                company_role!.toLowerCase() === 'owner' &&
                <div>
                    <button onClick={() => update(selected_company)}>Update</button>
                    <button onClick={() => {
                        dispatch(companyActions.deleteCompany({id: Number(selected_company.id)}))
                        navigate(`/${RouterEndpoints.company}`)
                    }}>Delete
                    </button>
                </div>

            }
            <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                <CompanyCreateForm onClose={() => setModalVisible(false)}/>
            </UniversalModalWindow>

        </div>
    );
};

export {CompanyProfile};