import {FC} from 'react';

import {IMYInvites} from '../../interfaces';
import css from './invite.module.css';
import {UserInviteRequestActions} from '..';

interface IProps {
    invite: IMYInvites,
    current_company_id: number | null

}

const Invite: FC<IProps> = ({invite, current_company_id}) => {
    const {id, employee_id, email, phone, name, invitation_status, request_status, created_at, role} = invite;


    return (
        <div className={css.inviteWrapper}>
            <div className={css.nft}>
                <div className={css.main}>
                    <img className={css.tokenImage}
                         src="https://images.unsplash.com/photo-1621075160523-b936ad96132a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                         alt="NFT"/>
                    <h3> #{id}</h3>
                    <h3> {name}</h3>
                    <hr/>
                    <div className={css.creator}>
                        <div className={css.wrapper}>
                            <img
                                src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                                alt="Creator"/>
                        </div>
                        <div className={css.role}>
                            <p>{role}</p>
                        </div>
                    </div>
                </div>


            </div>
            <div className={css.tokenInfoButton}>
                <UserInviteRequestActions invitation_status={invitation_status} request_status={request_status}
                                          employee_id={employee_id} current_company_id={current_company_id}/>
            </div>
        </div>
    );
};

export {Invite};
