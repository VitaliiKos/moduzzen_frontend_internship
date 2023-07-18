import {FC} from 'react';
import {useParams} from 'react-router-dom';

import {ButtonNavigate} from '../../Components';
import {companies, ITemporaryCompany} from '../../temporaryData';

const CompanyProfilePage: FC = () => {

        const {id} = useParams();
        const currentCompany: ITemporaryCompany | undefined = companies.find(company => company.id === Number(id))

        if (!currentCompany) {
            return (
                <div>Company not found.</div>
            );
        }
        return (
            <div>
                <ButtonNavigate navigate_params={'/company'}/>
                <h3>{currentCompany.id}. {currentCompany.name}</h3>
                <h3>{currentCompany.email}</h3>
                <h3>{currentCompany.phone}</h3>
                <h3>{currentCompany.city}</h3>
                <h3>{currentCompany.street}</h3>
            </div>
        );
    }
;

export {CompanyProfilePage};