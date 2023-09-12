import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {ICompany} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {analyticsActions, companyActions} from '../../Store/slice';
import {RouterEndpoints} from '../../routes';
import {
    ActionConfirmation,
    CompanyCreateForm,
    RatingStars,
    SwitchComponent,
    UniversalModalWindow
} from '../../Components';

interface IProps {
    selected_company: ICompany
}

const CompanyProfile: FC<IProps> = ({selected_company}) => {
    const {id, name, email, status, phone} = selected_company;
    const {company_role} = useAppSelector(state => state.companyReducer);
    const {me} = useAppSelector(state => state.authReducer);
    const {userCompanyrating} = useAppSelector(state => state.analyticsReducer);

    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    const navigate = useNavigate();


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(companyActions.getUserRole({id: Number(id)}))
    }, [id, dispatch]);
    const update = (selected_company: ICompany) => {
        dispatch(companyActions.setCompanyForUpdate(selected_company))
        setModalVisible(true)
    }

    const deleteCompany = () => {
        setSelectedAction('deleteCompany');
        setShowConfirmation(true);
    }
    const handleConfirmation = async () => {
        switch (selectedAction) {
            case 'deleteCompany':
                await dispatch(companyActions.deleteCompany({id: Number(selected_company.id)}))
                navigate(`/${RouterEndpoints.company}`);
                break;

            default:
                break;
        }

        setShowConfirmation(false);
        setSelectedAction(null);
    };
    useEffect(() => {

    }, [isModalVisible, showConfirmation]);

    useEffect(() => {
        dispatch(analyticsActions.userRatingInCompany({user_id: Number(me!.id), company_id: Number(id)}))
    }, [me,id, dispatch]);


    return (
        <div>
            <h3>CompanyProfile</h3>
            <h4>{id}.</h4>
            <h4>Name: {name}</h4>
            <h4>Email: {email}</h4>
            <h4>Phone: {phone}</h4>
            <div>
                <h4>Active status: {status ? 'Visable' : 'Invisable'}</h4>
            </div>
            <div>
                {userCompanyrating &&
                    <>
                        <div><em>{userCompanyrating.average_score ?? 0}/100</em></div>
                        <RatingStars
                            ratingScore={userCompanyrating.average_score ? userCompanyrating.average_score : 0}
                            precision={0.2}
                            countOfstars={10}/>
                    </>
                }
            </div>

            <h4>Your role: {company_role}</h4>
            {

                company_role!.toLowerCase() === 'owner' &&
                <div>
                    <SwitchComponent company_status={selected_company.status!} company_id={Number(id)}/>
                    <button onClick={() => update(selected_company)}>Update</button>
                    <button onClick={() => deleteCompany()}>Delete</button>
                </div>

            }
            <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                <CompanyCreateForm onClose={() => setModalVisible(false)}/>
            </UniversalModalWindow>

            <UniversalModalWindow visible={showConfirmation} onClose={() => setModalVisible(false)}>
                <ActionConfirmation onClose={() => setShowConfirmation(false)}
                                    handleYes={handleConfirmation}/>
            </UniversalModalWindow>


        </div>
    )
        ;
};

export {CompanyProfile};