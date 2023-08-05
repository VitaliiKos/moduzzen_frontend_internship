import React, {FC} from 'react';

import {ButtonDetail} from '..';
import css from './user.module.css';
import {IUserResp} from '../../interfaces';

interface IProps {
    user: IUserResp,
}

const User: FC<IProps> = ({user}) => {
    const {id, username} = user;
    return (
        <div className={css.userWrapper}>
            <h3>{id}. {username}</h3>

            {id &&
                <ButtonDetail id={id}/>
            }

        </div>
    );
};

export {User};