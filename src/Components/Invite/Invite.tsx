import {FC} from 'react';

import {IInvites} from '../../interfaces';
import css from './invite.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActivitiesActions} from '../../Store/slice';

interface IProps {
    invite: IInvites,
    current_company_id: number | null

}

const Invite: FC<IProps> = ({invite, current_company_id}) => {
    const dispatch = useAppDispatch();
    const {id, user_id, company_id, invitation_status, request_status, created_at, role} = invite;
    const {skip} = useAppSelector(state => state.mainReducer);

    const cancelInvite = async (id: number) => {
        await dispatch(companyActivitiesActions.cancelCompanyInvite({employee_id: id}))
        dispatch(companyActivitiesActions.getCompanyInvites({company_id: Number(company_id), query: {skip}}));
    }
    const cancelRrequest = async (id: number) => {
        await dispatch(companyActivitiesActions.cancelUserRequest({employee_id: id}))
        dispatch(companyActivitiesActions.getMyRequests({query: {skip}}));
    }
    const rejectInvite = async (id: number) => {
        await dispatch(companyActivitiesActions.rejectInvite({employee_id: id}))
        dispatch(companyActivitiesActions.getMyInvites({query: {skip}}));
    }
    const acceptInvite = async (id: number) => {
        await dispatch(companyActivitiesActions.acceptInvite({employee_id: id}))
        dispatch(companyActivitiesActions.getMyInvites({query: {skip}}));
    }

    return (
        <div className={css.inviteItem}>
            <h4>User: {user_id}</h4>
            <h4>Company: {company_id}</h4>
            <h4>Status: {invitation_status}</h4>
            <h4>Role: {role}</h4>
            <h4>{created_at.toString().split('T')[0]}</h4>
            {
                (current_company_id || request_status) ?
                    <>
                        {
                            current_company_id ?
                                <button onClick={() => cancelInvite(id)}>Cancel</button> :
                                <button onClick={() => cancelRrequest(id)}>Cancel</button>
                        }
                    </>
                    :
                    <>
                        <button onClick={() => rejectInvite(id)}>Reject</button>
                        <button onClick={() => acceptInvite(id)}>Accept</button>
                    </>
            }

        </div>
    );
};

export {Invite};