import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {IUser} from '../../interfaces';
import {useAppDispatch} from '../../hooks';
import {mainAction} from '../../Store/slice';
import css from './userProfile.module.css';
import {RouterEndpoints} from '../../routes';

interface IProps {
    me: IUser
}

const UserProfile: FC<IProps> = ({me}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
            <div className={css.profileDescription}>
                <h3>Id.{me.id}</h3>
                <h3>Username: {me.username ?? 'null'}</h3>
                <h3>Email: {me.email}</h3>
                <h3>Phone: {me.phone_number ?? 'null'}</h3>
                <h3>City: {me.city ?? 'null'}</h3>
                <h3>Age: {me.age ?? 'null'}</h3>
                <h3>Created at: {me.created_at!.toString().split('T')[0]}</h3>
                <h3>Updated at: {me.updated_at!.toString().split('T')[0]}</h3>
                <div className={css.formButtonWrapper}>
                    <button onClick={() => dispatch(mainAction.setUserForUpdate(me))}>Update</button>
                    <button onClick={() => {
                        dispatch(mainAction.deleteUser({'id': Number(me.id)}))
                        navigate(`/${RouterEndpoints.authorization}`)
                    }}>Delete
                    </button>
                </div>
                <div className={css.userOptionsButton}>
                    <button className={css.userButtonAction} onClick={() => navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.myCompanies}`)}>Show
                        my companies
                    </button>
                    <button className={css.userButtonAction} onClick={() => navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.myInvites}`)}>Show
                        my invitations
                    </button>
                    <button className={css.userButtonAction} onClick={() => navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.myRequest}`)}>Show
                        my requests
                    </button>
                    <button className={css.userButtonAction} onClick={() => navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.findCompany}`)}>Find
                        Company
                    </button>
                </div>
            </div>
            <div className={css.profileAvatar}>
                <img src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png" alt="avatar"/>
            </div>


        </>
    );
};

export {UserProfile};