import {FC} from 'react';

import {IMembers} from '../../interfaces/members.interface';
import css from './member.module.css';
import {MemberActions} from '..';


interface IProps {
    member: IMembers,
    company_id: number
}

const Member: FC<IProps> = ({member, company_id}) => {

    const {id, username, role, employee_id, invitation_status, request_status} = member;

    return (
        <div className={css.userWrapper}>
            <figure className={css.snip1336}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/>
                <figcaption>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg"
                         alt="profile-sample4"
                         className={css.profile}/>
                    <h2>{id}.{username}<span>{role}</span></h2>
                </figcaption>
            </figure>
            <MemberActions employee_id={employee_id} user_id={id} role={role} company_id={company_id}
                           invitation_status={invitation_status} request_status={request_status}/>
        </div>
    );
};

export {Member};