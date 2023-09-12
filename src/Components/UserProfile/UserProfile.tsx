import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {IUser} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {analyticsActions, authActions, mainAction} from '../../Store/slice';
import css from './userProfile.module.css';
import {RouterEndpoints} from '../../routes';
import {ActionConfirmation, AnalyticsChart, RatingStars, UniversalModalWindow} from '..';

interface IProps {
    me: IUser
}

const UserProfile: FC<IProps> = ({me}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        userSystemrating,
        userlistOfAverageInAllQuizzesInAllCompanies
    } = useAppSelector(state => state.analyticsReducer);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [showModalWindow, setShowModalWindow] = useState<boolean>(false);
    const [selectedAction, setSelectedAction] = useState<string | null>(null);

    const deleteProfile = () => {
        setSelectedAction('deleteProfile');
        setModalVisible(true);
    }
    const showAnalitics = () => {
        setShowModalWindow(true);
    }
    const handleConfirmation = async () => {
        switch (selectedAction) {
            case 'deleteProfile':
                await dispatch(mainAction.deleteUser({'id': Number(me.id)}))
                dispatch(authActions.delete_token())
                navigate(`/${RouterEndpoints.authorization}`)
                break;

            default:
                break;
        }

        setModalVisible(false);
        setSelectedAction(null);
    };


    useEffect(() => {
        dispatch(analyticsActions.userRatingInSystem({user_id: Number(me.id)}))
        dispatch(analyticsActions.listOfAverageInAllQuizzesInAllCompanies({user_id: Number(me.id)}))
    }, [userSystemrating, me, dispatch, me.id]);

    const uniqueLabels: string[] = Array.from(
        new Set(
            userlistOfAverageInAllQuizzesInAllCompanies
                .map(item =>
                    item.score.map(scoreItem => new Date(scoreItem.timestamp).toLocaleDateString())
                )
                .flat()
        )
    );
    const lineLabels = userlistOfAverageInAllQuizzesInAllCompanies.map(item => item.quiz_id);
    const scores = userlistOfAverageInAllQuizzesInAllCompanies.map(item => item.score.map(scoreItem => scoreItem.average_score));


    return (
        <>
            <div className={css.profileDescription}>
                <h3>Id.{me.id}</h3>
                <h3>Username: {me.username ?? 'null'}</h3>
                <h3>Email: {me.email}</h3>
                <h3>Phone: {me.phone_number ?? 'null'}</h3>
                <h3>City: {me.city ?? 'null'}</h3>
                <h3>Age: {me.age ?? 'null'}</h3>
                <h3>Created at: {me.created_at!.toString().split('T')[0]}</h3>
                <h3>Updated at: {me.updated_at!.toString().split('T')[0]}</h3>

                <div className={css.userSystemRating}>
                    <div><em>{userSystemrating ?? 0}/100</em></div>
                    <RatingStars ratingScore={userSystemrating ? userSystemrating : 0} precision={0.2}
                                 countOfstars={10}/>
                </div>
                <div className={css.formButtonWrapper}>

                    <button onClick={() => dispatch(mainAction.setUserForUpdate(me))}>Update</button>

                    <button onClick={() => deleteProfile()}>Delete profile</button>
                    <button onClick={() => showAnalitics()}>Show analitics</button>

                </div>
                <div className={css.userOptionsButton}>
                    <button className={css.userButtonAction}
                            onClick={() => navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.myCompanies}`)}>Show
                        my companies
                    </button>
                    <button className={css.userButtonAction}
                            onClick={() => navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.myInvites}`)}>Show
                        my invitations
                    </button>
                    <button className={css.userButtonAction}
                            onClick={() => navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.myRequest}`)}>Show
                        my requests
                    </button>
                    <button className={css.userButtonAction}
                            onClick={() => navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.findCompany}`)}>Find
                        Company
                    </button>
                    <button className={css.userButtonAction}
                            onClick={() => navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.avaliable_quizzes}`)}>My
                        avaliable quizzes
                    </button>


                </div>
            </div>
            <div className={css.profileAvatar}>
                <img src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_640.png" alt="avatar"/>
            </div>

            <UniversalModalWindow visible={isModalVisible} onClose={() => setModalVisible(false)}>
                <ActionConfirmation onClose={() => setModalVisible(false)}
                                    handleYes={handleConfirmation}/>
            </UniversalModalWindow>

            <UniversalModalWindow visible={showModalWindow} onClose={() => setShowModalWindow(false)}>
                <AnalyticsChart onClose={() => setShowModalWindow(false)} uniqueLabels={uniqueLabels}
                                lineLabels={lineLabels} scores={scores}/>
            </UniversalModalWindow>

        </>
    );
};

export {UserProfile};