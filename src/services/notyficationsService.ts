import {apiService} from '.';
import {mainUrls} from '../config';
import {IPagination, IRequest} from '../interfaces';
import {INotificationResponse} from '../interfaces/notifications.interface';
import {IRes} from '../types';

class NotyficationsService {
    getUserNotyfications({skip = 0}: IRequest): IRes<IPagination<INotificationResponse[]>> {
        return apiService.get(mainUrls.notifications.getAllMyNotification, {params: {skip}})
    }

    readNotifications(notif_id: number): IRes<void> {
        return apiService.get(mainUrls.notifications.readNotification(notif_id))
    }
}

export const notyficationsService = new NotyficationsService()