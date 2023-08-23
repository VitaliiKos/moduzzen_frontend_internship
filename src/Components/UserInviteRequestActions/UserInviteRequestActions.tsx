import {FC, useEffect, useState} from 'react';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActivitiesActions} from '../../Store/slice';
import {ActionConfirmation, UniversalModalWindow} from '..';

interface IProps {
    request_status: boolean
    invitation_status: boolean
    current_company_id: number | null
    employee_id: number
}

const UserInviteRequestActions: FC<IProps> = ({request_status, invitation_status, current_company_id, employee_id}) => {
    const dispatch = useAppDispatch();
    const {skip} = useAppSelector(state => state.mainReducer);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    const cancelInvite = async () => {
        setSelectedAction('cancelInvite');
        setModalVisible(true);
    };

    const cancelRrequest = async () => {
        setSelectedAction('cancelRrequest');
        setModalVisible(true);
    };

    const rejectInvite = async () => {
        setSelectedAction('rejectInvite');
        setModalVisible(true);
    };

    const rejectRequest = async () => {
        setSelectedAction('rejectRequest');
        setModalVisible(true);
    };
    const acceptInvite = async () => {
        setSelectedAction('acceptInvite');
        setModalVisible(true);
    };

    const acceptRequest = async () => {
        setSelectedAction('acceptRequest');
        setModalVisible(true);
    };
    const handleConfirmation = async () => {
        switch (selectedAction) {
            case 'cancelInvite':
                await dispatch(companyActivitiesActions.cancelCompanyInvite({employee_id}))
                dispatch(companyActivitiesActions.getCompanyInvites({company_id: Number(current_company_id), query: {skip}}));
                break;
            case 'cancelRrequest':
                await dispatch(companyActivitiesActions.cancelUserRequest({employee_id}))
                dispatch(companyActivitiesActions.getMyRequests({query: {skip}}));
                break;
            case 'rejectInvite':
                await dispatch(companyActivitiesActions.rejectInvite({employee_id}))
                dispatch(companyActivitiesActions.getMyInvites({query: {skip}}));
                break;
            case 'rejectRequest':
                await dispatch(companyActivitiesActions.rejectRequest({employee_id}))
                dispatch(companyActivitiesActions.getCompanyRequests({company_id: Number(current_company_id), query: {skip}}));
                break;
            case 'acceptInvite':
                await dispatch(companyActivitiesActions.acceptInvite({employee_id}))
                dispatch(companyActivitiesActions.getMyInvites({query: {skip}}));
                break;
            case 'acceptRequest':
                await dispatch(companyActivitiesActions.acceptRequest({employee_id}))
                dispatch(companyActivitiesActions.getCompanyRequests({company_id: Number(current_company_id), query: {skip}}));
                break;
            default:
                break;
        }

        setModalVisible(false);
        setSelectedAction(null);
    };
    useEffect(() => {

    }, [isModalVisible]);

    return (
        <div>
            {
                (current_company_id || request_status) ?
                    <>
                        {(current_company_id && invitation_status) &&
                            <button onClick={() => cancelInvite()}>Cancel</button>}
                        {
                            (current_company_id && request_status) &&
                            <>
                                <button onClick={() => rejectRequest()}>Reject</button>
                                <button onClick={() => acceptRequest()}>Accept</button>
                            </>
                        }
                        {!current_company_id && <button onClick={() => cancelRrequest()}>Cancel</button>}
                    </>
                    :
                    <>
                        <button onClick={() => rejectInvite()}>Reject</button>
                        <button onClick={() => acceptInvite()}>Accept</button>
                    </>
            }
            <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                <ActionConfirmation onClose={() => setModalVisible(false)}
                                    handleYes={handleConfirmation}/>
            </UniversalModalWindow>

        </div>
    );
};

export {UserInviteRequestActions};