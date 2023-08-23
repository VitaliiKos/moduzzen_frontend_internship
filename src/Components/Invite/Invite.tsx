import {FC} from 'react';

import {IMYInvites} from '../../interfaces';
import css from './invite.module.css';
import {UserInviteRequestActions} from '..';

interface IProps {
    invite: IMYInvites,
    current_company_id: number | null

}

const Invite: FC<IProps> = ({invite, current_company_id}) => {
    const {id, employee_id, email, phone, name,  invitation_status, request_status, created_at, role} = invite;


    return (
        <div className={css.inviteItem}>
            <h5>{id}: {name}</h5>
            <h5>Email: {email}</h5>
            <h5>Phone: {phone}</h5>
            <h5>Role: {role}</h5>
            <h5>{created_at.toString().split('T')[0]}</h5>
            <UserInviteRequestActions invitation_status={invitation_status} request_status={request_status}
                                      employee_id={employee_id} current_company_id={current_company_id}/>
        </div>
    );
};

export {Invite};