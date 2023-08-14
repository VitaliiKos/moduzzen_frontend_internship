import {FC, useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActions} from '../../Store/slice';
import css from './myOwnListCompany.module.css';
import {CompanyCreateForm, CompanyList, UniversalModalWindow} from '../../Components';

const MyListCompanyPage: FC = () => {
    const dispatch = useAppDispatch();

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const {companies, total_page, total_item, limit, skip} = useAppSelector((state) => state.companyReducer);


    useEffect(() => {
        dispatch(companyActions.getMyCompanies({query: {skip}}));
    }, [dispatch, limit, skip]);


    return (
        <div className={css.companyListWrapper}>
            <CompanyList companies={companies} total_page={total_page} total_item={total_item}/>
            <button onClick={() => setModalVisible(true)}>Create new company</button>


            <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                <CompanyCreateForm onClose={() => setModalVisible(false)}/>
            </UniversalModalWindow>

        </div>
    );
};

export {MyListCompanyPage};