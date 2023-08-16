import {FC} from 'react';

import {ICompany} from '../../interfaces';
import css from './company.module.css';
import {Link} from 'react-router-dom';

interface IProps {
    company: ICompany,
}

const Company: FC<IProps> = ({company}) => {

    const {id, name} = company;

    return (

        <div className={css.companyWrapper}>
            <figure className={css.snip1336}>
                <img src="https://images.pexels.com/photos/2918014/pexels-photo-2918014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                     alt="sample87"/>
                <figcaption>
                    <img src="https://png.pngtree.com/png-clipart/20190604/original/pngtree-creative-company-logo-png-image_1197025.jpg"
                         alt="profile-sample4"
                         className={css.profile}/>
                    <h2>{id}.{name}</h2>
                    <div className={css.buttonWrapper}>
                        <Link to={"#"} className={css.follow}>Follow</Link>
                        <Link to={`${id}`} className={css.info}>Info</Link>
                    </div>
                </figcaption>
            </figure>
        </div>

    );
};

export {Company};