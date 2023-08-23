import {FC} from 'react';

import {ICompany, IMyCompany} from '../../interfaces';
import css from './company.module.css';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActions, companyActivitiesActions} from '../../Store/slice';

interface IProps {
    company: IMyCompany | ICompany,
    searc_status: boolean
}

const Company: FC<IProps> = ({company,searc_status}) => {
    const {id, name} = company;
    const {skip} = useAppSelector(state => state.mainReducer);
    const dispatch = useAppDispatch();

    const send_request = async (id: number) => {
        await dispatch(companyActivitiesActions.sendRequestFromUser({company_id: Number(id)}))
        dispatch(companyActions.find_companies({query: {skip}}));

    }
    return (

        <div className={css.companyWrapper}>
            <figure className={css.snip1336}>
                <img
                    src="https://images.pexels.com/photos/2918014/pexels-photo-2918014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="sample87"/>
                <figcaption>
                    <img
                        src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1197025.jpg"
                        alt="profile-sample4"
                        className={css.profile}/>
                    <h2>{id}.{name}{('role' in company) && <span>{company.role}</span>}</h2>
                    <div className={css.buttonWrapper}>
                        <Link to={`/company/${id}`} className={css.info}>Info</Link>
                        {(!('role' in company )&& searc_status) &&
                            <Link to={'#'} onClick={() => send_request(Number(id))}>Request</Link>}
                    </div>
                </figcaption>
            </figure>
        </div>

    );
};

export {Company};