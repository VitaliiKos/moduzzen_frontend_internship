import {FC} from 'react';

import {ITemporaryCompany} from '../../temporaryData';
import {ButtonDetail} from '../ButtonDetail/ButtonDetail';
import css from './company.module.css';

interface IProps {
    company: ITemporaryCompany,
}

const Company: FC<IProps> = ({company}) => {

    const {id, name} = company;

    return (
        <div className={css.companyWrapper}>
            <h3>{id}. {name}</h3>

            <ButtonDetail id={id}/>

        </div>
    );
};

export {Company};