import {FC} from 'react';
import {INotificationResponse} from '../../interfaces/notifications.interface';
import css from './notyficationMsg.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {notyficationsActions} from '../../Store/slice';

interface IProps {
    notyfication: INotificationResponse
}

const NotificationMsg: FC<IProps> = ({notyfication}) => {
    const {skip} = useAppSelector(state => state.mainReducer);

    const dispatch = useAppDispatch();

    const readNotif = async (notif_id: number) => {
        await dispatch(notyficationsActions.readNotifications({notif_id}))
        dispatch(notyficationsActions.getMyNotifications({query: {skip}}));

    }

    return (
        <div>
            <ul className={`${ css.tilesWrap }   ${!notyfication.is_read ? css.newMsg : css.tilesWrap}`}>
                <li>
                    <h2>{notyfication.id}</h2>
                    <h3>{notyfication.quiz_id}</h3>
                    <p>
                        {notyfication.massage}
                    </p>
                    <button disabled={notyfication.is_read} onClick={() => {
                        readNotif(notyfication.id)
                    }}>Read msg
                    </button>
                </li>
            </ul>
        </div>
    );
};

export {NotificationMsg};