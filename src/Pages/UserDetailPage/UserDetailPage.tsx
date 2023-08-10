import {FC, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {ButtonNavigate} from '../../Components';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {mainAction} from '../../Store/slice';

const UserDetailPage: FC = () => {

    const dispatch = useAppDispatch();
    const {selected_user, error} = useAppSelector(state => state.mainReducer);
    const {id} = useParams();

    useEffect(() => {
        dispatch(mainAction.getById({'id': Number(id)}))
    }, [id, dispatch]);


    if (!selected_user) {
        return (
            <div>{error && <h3>{error.detail}</h3>}</div>
        );
    }

    return (
        <div>
            <ButtonNavigate navigate_params={'/users'}/>
            <h3>{selected_user.id}. {selected_user.username}</h3>
            <h3>Email: {selected_user.email}</h3>
            <h3>Age: {selected_user.age}</h3>
            <h3>Phone: {selected_user.phone_number}</h3>
            <h3>City: {selected_user.city}</h3>
            <h3>Created at: {selected_user.created_at}</h3>
            <h3>Updated at:{selected_user.updated_at}</h3>
        </div>
    );
};

export {UserDetailPage};