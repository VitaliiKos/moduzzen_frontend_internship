import {FC, useEffect} from 'react';

import {IMembers} from '../../interfaces/members.interface';
import css from './member.module.css';
import {MemberActions} from '..';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {analyticsActions} from '../../Store/slice';
import {useParams} from 'react-router-dom';


interface IProps {
    member: IMembers,
    company_id: number
}

const Member: FC<IProps> = ({member, company_id}) => {
    const dispatch = useAppDispatch();
    const {skip} = useAppSelector(state => state.mainReducer);
    const {memberListWithLastAttempt} = useAppSelector(state => state.analyticsReducer);

    const {id: user_id, username, role, employee_id, invitation_status, request_status} = member;

    const lastattempt = memberListWithLastAttempt.filter(item => item.employee.member.id === user_id)[0]

    useEffect(() => {
        dispatch(analyticsActions.membersLastAttempt({company_id, query: {skip}}))
    }, []);

    return (
        <div className={css.userWrapper}>
            <figure className={css.snip1336}>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87"/>
                <figcaption>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample5.jpg"
                         alt="profile-sample4"
                         className={css.profile}/>
                    <h2>{user_id}.{username}<span>{role}</span></h2>
                    <h2>
                        {lastattempt &&

                            <span>Last attemp {lastattempt.last_completed_time ? lastattempt.last_completed_time.split('T')[0] : 'null'}</span>
                        }
                    </h2>

                </figcaption>
            </figure>
            <MemberActions employee_id={employee_id} user_id={user_id} role={role} company_id={company_id}
                           invitation_status={invitation_status} request_status={request_status}/>

        </div>
    );
};

export {Member};