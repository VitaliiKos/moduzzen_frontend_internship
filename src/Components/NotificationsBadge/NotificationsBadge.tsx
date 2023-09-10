import {FC} from 'react';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import {useNavigate} from 'react-router-dom';
import {RouterEndpoints} from '../../routes';
import css from './notificationsBadge.module.css';

interface IProps {
    count_msg:number

}
const NotificationsBadge: FC<IProps> = ({count_msg}) => {

    const navigate = useNavigate();

    return (
        <Stack spacing={2} direction="row" className={css.badgeWrapper}
               onClick={() => navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.notification}`)}>

            <Badge badgeContent={count_msg} color="warning">
                <MailIcon color="secondary"/>
            </Badge>
        </Stack>);
};

export {NotificationsBadge};