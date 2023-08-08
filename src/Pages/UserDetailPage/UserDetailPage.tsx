import {FC} from 'react';
import {useParams} from 'react-router-dom';

import {ButtonNavigate} from '../../Components';
import {IUser} from '../../interfaces';
import { useAppSelector } from '../../hooks';

const UserDetailPage: FC = () => {

    const {id} = useParams();
    const {users} = useAppSelector(state => state.mainReducer);

    const currentUsers: IUser | undefined = users.find(user => user.id === Number(id))

    if (!currentUsers) {
        return (
            <div>User not found.</div>
        );
    }

    return (
        <div>
            <ButtonNavigate navigate_params={'/users'}/>
            <h3>{currentUsers.id}. {currentUsers.username}</h3>
            <h3>Email: {currentUsers.email}</h3>
            <h3>Age: {currentUsers.age}</h3>
            <h3>Phone: {currentUsers.phone_number}</h3>
            <h3>City: {currentUsers.city}</h3>
            <h3>Created at: {currentUsers.created_at}</h3>
            <h3>Updated at:{ currentUsers.updated_at}</h3>
        </div>
    );
};

export {UserDetailPage};