import React, {FC, useEffect} from 'react';

import css from './user.module.css';
import {IUser} from '../../interfaces';
import {Link} from 'react-router-dom';
import {RouterEndpoints} from '../../routes';

interface IProps {
    user: IUser,
    children: React.ReactNode;
    setUser_id?: React.Dispatch<React.SetStateAction<number | null>>,

}

const User: FC<IProps> = ({user, children, setUser_id}) => {
    const {id, username} = user;

    useEffect(() => {
        if (setUser_id) {
            setUser_id(Number(id))
        }
    }, [id, setUser_id]);

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
                        {children}
                        <Link to={`/${RouterEndpoints.users}/${id}`} className={css.info}>Info</Link>
                    </div>
                </figcaption>
            </figure>
            <div></div>
        </div>
    );
};

export {User};

