import {FC, useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActions} from '../../Store/slice';
import {CompanyCreateForm, CompanyList, UniversalModalWindow} from '../../Components';
import css from './myListCompanyPage.module.css';

const MyListCompanyPage: FC = () => {
    const dispatch = useAppDispatch();

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const {companies, total_page, total_item, limit, skip} = useAppSelector((state) => state.companyReducer);


    useEffect(() => {
        dispatch(companyActions.getMyCompanies({query: {skip}}));
    }, [dispatch, limit, skip]);


    return (
        <div className={css.myCompanyListWrapper}>
            <CompanyList companies={companies} total_page={total_page} total_item={total_item}/>
            <div>
                <button onClick={() => setModalVisible(true)}>Create new company</button>
            </div>


            <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                <CompanyCreateForm onClose={() => setModalVisible(false)}/>
            </UniversalModalWindow>

        </div>
    );
};

export {MyListCompanyPage};