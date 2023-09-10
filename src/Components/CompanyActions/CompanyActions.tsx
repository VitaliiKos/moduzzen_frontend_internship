import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {companyActions, companyActivitiesActions} from '../../Store/slice';
import {ActionConfirmation, UniversalModalWindow} from '..';


interface IProps {
    company_role: string | null
    company_id: number
}

const CompanyActions: FC<IProps> = ({company_role, company_id}) => {
    const {skip} = useAppSelector((state) => state.companyReducer);

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const show_members = (id: number) => {
        navigate(`/profile/my_company/${id}/company_members`)
    }

    const show_candidates = (id: number) => {
        navigate(`/profile/my_company/${id}/company_candidates`)
    }
    const show_invites = (id: number) => {
        navigate(`/profile/my_company/${id}/company_invites`)
    }
    const show_requests = (id: number) => {
        navigate(`/profile/my_company/${id}/company_requests`)
    }

    const leave_company = async () => {
        setSelectedAction('leave_company');
        setModalVisible(true);
    };

    const show_admins = async (company_id: number) => {
        navigate(`/profile/my_company/${company_id}/company_admins`)
    }
    const show_quizzes = async (company_id: number) => {
        navigate(`/profile/my_company/${company_id}/company_quizzes`)
    }

    const handleConfirmation = async () => {
        switch (selectedAction) {
            case 'leave_company':
                await dispatch(companyActivitiesActions.leave_company({company_id}))
                navigate('/profile/my_company')
                dispatch(companyActions.getMyCompanies({query: {skip}}));

                break;
            default:
                break;
        }

        setModalVisible(false);
        setSelectedAction(null);
    };

    useEffect(() => {

    }, [isModalVisible]);

    switch (company_role) {
        case 'Owner':
            return (
                <div>
                    <button onClick={() => show_members(company_id)}>Show members</button>
                    <button onClick={() => show_candidates(company_id)}>Show canditates</button>
                    <button onClick={() => show_invites(company_id)}>Show Invites</button>
                    <button onClick={() => show_requests(company_id)}>Show requests</button>
                    <button onClick={() => show_admins(company_id)}>Show admins</button>
                    <button onClick={() => show_quizzes(company_id)}>Show quizzes</button>
                </div>
            );
        case 'Admin':
            return (
                <div>
                    <button onClick={() => leave_company()}>Leave company</button>
                    <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                        <ActionConfirmation onClose={() => setModalVisible(false)} handleYes={handleConfirmation}/>
                    </UniversalModalWindow>
                    <button onClick={() => show_quizzes(company_id)}>Show quizzes</button>
                </div>
            );
        case 'Member':
            return (
                <div>
                    <button onClick={() => leave_company()}>Leave company</button>
                    <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                        <ActionConfirmation onClose={() => setModalVisible(false)} handleYes={handleConfirmation}/>
                    </UniversalModalWindow>

                    <button onClick={() => show_quizzes(company_id)}>Show quizzes</button>
                </div>
            );
        case 'Candidate':
            return null
        default:
            return null
    }
};

export {CompanyActions};