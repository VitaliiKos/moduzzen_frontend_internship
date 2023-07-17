import {FC} from 'react';
import {useParams} from 'react-router-dom';

import {ButtonNavigate} from '../../Components';
import {ITemporaryUser, users} from '../../temporaryData';

const UserProfilePage: FC = () => {

    const {id} = useParams();
    const currentUsers: ITemporaryUser | undefined = users.find(user => user.id === Number(id))

    if (!currentUsers) {
        return (
            <div>User not found.</div>
        );
    }


    return (
        <div>
            <div>
                <ButtonNavigate navigate_params={'/users'}/>
                <h3>{currentUsers.id}. {currentUsers.username}</h3>
                <h3>{currentUsers.email}</h3>
                <h3>{currentUsers.phone}</h3>
                <h3>{currentUsers.city}</h3>
                <h3>{currentUsers.street}</h3>
            </div>
        </div>
    );
};

export {UserProfilePage};