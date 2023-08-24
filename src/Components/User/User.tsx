import React, {FC} from 'react';

import css from './user.module.css';
import {IUser} from '../../interfaces';
import {Link, useParams} from 'react-router-dom';
import {RouterEndpoints} from '../../routes';
import {ButtonInvite} from '..';

interface IProps {
    user: IUser,

}

const User: FC<IProps> = ({user}) => {
    const {id, username} = user;
    const {id: company_id} = useParams();

    return (

        <div className={css.userWrapper}>
            <figure className={css.snip1336}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/>
                <figcaption>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg"
                         alt="profile-sample4"
                         className={css.profile}/>
                    <h2>{id}.{username}<span>Engineer</span></h2>
                    <div className={css.buttonWrapper}>
                        <Link to={`/${RouterEndpoints.users}/${id}`} className={css.info}>Info</Link>
                        <ButtonInvite company_id={company_id} user_id={Number(id)}/>
                    </div>
                </figcaption>
            </figure>
            <div></div>
        </div>
    );
};

export {User};

