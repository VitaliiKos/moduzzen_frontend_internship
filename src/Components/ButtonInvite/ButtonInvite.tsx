import {FC} from 'react';
import {Link} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActivitiesActions} from '../../Store/slice';
import css from './buttonInvite.module.css'

interface IProps {
    company_id: number
    user_id: number | null
}

const ButtonInvite: FC<IProps> = ({company_id, user_id}) => {
    const dispatch = useAppDispatch();
    const {skip} = useAppSelector(state => state.mainReducer);


    const send_invitation = async () => {
        await dispatch(companyActivitiesActions.sendInviteFromCompany({company_id, user_id: Number(user_id)}))
        dispatch(companyActivitiesActions.getPotentialCandidates({company_id: Number(company_id), query: {skip}}));

    }
    return (
        <>
            <Link to={"#"} onClick={() => send_invitation()} className={css.follow}>Invite</Link>

        </>
    );
};

export {ButtonInvite};

