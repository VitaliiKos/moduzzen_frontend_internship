import {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import css from './memberActions.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActivitiesActions} from '../../Store/slice';
import {UniversalModalWindow} from '../UniversalModalWindow/UniversalModalWindow';
import {ActionConfirmation} from '../ActionConfirmation/ActionConfirmation';

interface IProps {
    user_id: number
    employee_id: number
    role: string
    company_id: number
    invitation_status: string
    request_status: string
}

const MemberActions: FC<IProps> = ({employee_id, company_id, role, invitation_status, request_status, user_id}) => {

    const dispatch = useAppDispatch();
    const {skip} = useAppSelector(state => state.mainReducer);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    const firedFromTheCompany = async () => {
        setSelectedAction('firedFromTheCompany');
        setModalVisible(true);
    };

    const cancelInvite = async () => {
        setSelectedAction('cancelInvite');
        setModalVisible(true);
    };

    const rejectRequest = async () => {
        setSelectedAction('rejectRequest');
        setModalVisible(true);
    };

    const acceptRequest = async () => {
        setSelectedAction('acceptRequest');
        setModalVisible(true);
    };
    const handleConfirmation = async () => {
        switch (selectedAction) {
            case 'firedFromTheCompany':
                await dispatch(companyActivitiesActions.fired_from_the_company({company_id, user_id}));
                dispatch(companyActivitiesActions.getMembers({company_id: Number(company_id), query: {skip}}));
                break;
            case 'cancelInvite':
                await dispatch(companyActivitiesActions.cancelCompanyInvite({employee_id}));
                dispatch(companyActivitiesActions.getCompanyInvites({company_id: Number(company_id), query: {skip}}));
                break;
            case 'rejectRequest':
                await dispatch(companyActivitiesActions.rejectRequest({employee_id}));
                dispatch(companyActivitiesActions.getCompanyRequests({company_id: Number(company_id), query: {skip}}));
                break;
            case 'acceptRequest':
                await dispatch(companyActivitiesActions.acceptRequest({employee_id}));
                dispatch(companyActivitiesActions.getCompanyRequests({company_id: Number(company_id), query: {skip}}));
                break;
            default:
                break;
        }

        setModalVisible(false);
        setSelectedAction(null);
    };
    useEffect(() => {

    }, [isModalVisible]);

    switch (role) {
        case 'Owner':
            return (
                <div className={css.buttonWrapper}>
                    <Link to='#'>Some Action</Link>
                    <Link to='#'>Some Action</Link>
                    <Link to='#'>Some actions</Link>
                </div>
            );
        case 'Candidate':
            return (
                <div className={css.buttonWrapper}>
                    {invitation_status &&
                        <>
                            <Link to='#' onClick={() => cancelInvite()}>Cancel</Link>
                            <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                                <ActionConfirmation onClose={() => setModalVisible(false)}
                                                    handleYes={handleConfirmation}/>
                            </UniversalModalWindow>

                        </>

                    }
                    {request_status &&
                        <>
                            <Link to='#' onClick={() => rejectRequest()}>Reject</Link>
                            <Link to='#' onClick={() => acceptRequest()}>Accept</Link>

                            <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                                <ActionConfirmation onClose={() => setModalVisible(false)}
                                                    handleYes={handleConfirmation}/>
                            </UniversalModalWindow>
                        </>
                    }
                </div>
            );

        case 'Member':
            return (
                <div className={css.buttonWrapper}>
                    <Link to='#'>Some actions</Link>
                    <Link to='#' onClick={() => firedFromTheCompany()}>Fired from the company</Link>
                    <Link to='#'>Some actions</Link>
                    <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                        <ActionConfirmation onClose={() => setModalVisible(false)} handleYes={handleConfirmation}/>
                    </UniversalModalWindow>
                </div>
            );
        default:
            return null
    }
};

export {MemberActions};