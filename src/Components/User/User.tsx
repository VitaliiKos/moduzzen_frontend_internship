import React, {FC} from 'react';

import {ButtonDetail} from '..';
import {ITemporaryUser} from '../../temporaryData';
import css from './user.module.css';

interface IProps {
    user: ITemporaryUser,
}

const User: FC<IProps> = ({user}) => {
    const {id, username} = user;
    return (
        <div className={css.userWrapper}>
            <h3>{id}. {username}</h3>

            <ButtonDetail id={id}/>

        </div>
    );
};

export {User};