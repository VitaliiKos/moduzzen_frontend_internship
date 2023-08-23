import {apiService} from '.';
import {IRequest} from '../interfaces/request.interface';

import {mainUrls} from '../config';
import {IMYInvites, IPagination, IUser} from '../interfaces';
import {IRes} from '../types';
import { IMembers } from '../interfaces/members.interface';


class CompanyActivitiesService {
    getCompanyMembers(company_id: number,{skip = 0}: IRequest): IRes<IPagination<IMembers[]>> {
        return apiService.get(mainUrls.invitation.members(company_id), {params: {skip}})
    }

    getCandidates(company_id: number,{skip = 0}: IRequest): IRes<IPagination<IUser[]>> {
        return apiService.get(mainUrls.invitation.candidates(company_id), {params: {skip}})
    }

    sendInvite(company_id: number, user_id:number): any {
        return apiService.get(mainUrls.invitation.send_invite(company_id, user_id))
    }
    sendRequest(company_id: number): any {
        return apiService.get(mainUrls.invitation.send_request(company_id))
    }
    getCompanyInvites(company_id: number,{skip = 0}: IRequest): IRes<IPagination<IMembers[]>> {
        return apiService.get(mainUrls.invitation.company_invite(company_id), {params: {skip}})
    }
    getCompanyRequests(company_id: number,{skip = 0}: IRequest): IRes<IPagination<IMembers[]>> {
        return apiService.get(mainUrls.invitation.company_requests(company_id), {params: {skip}})
    }
    getMyInvites({skip = 0}: IRequest): IRes<IPagination<IMYInvites[]>> {
        return apiService.get(mainUrls.invitation.my_invite(), {params: {skip}})
    }
    getMyRequests({skip = 0}: IRequest): IRes<IPagination<IMYInvites[]>> {
        return apiService.get(mainUrls.invitation.my_requests(), {params: {skip}})
    }
    cancelInvite(employee_id: number): IRes<void> {
        return apiService.get(mainUrls.invitation.cancel_invite(employee_id))
    }
    cancelRequest(employee_id: number): IRes<void> {
        return apiService.get(mainUrls.invitation.cancel_requeest(employee_id))
    }
    rejectInvite(employee_id: number): IRes<void> {
        return apiService.get(mainUrls.invitation.reject_invite(employee_id))
    }
    rejectRequest(employee_id: number): IRes<void> {
        return apiService.get(mainUrls.invitation.reject_request(employee_id))
    }
    acceptInvite(employee_id: number): IRes<void> {
        return apiService.get(mainUrls.invitation.accept_invite(employee_id))
    }
    acceptRequest(employee_id: number): IRes<void> {
        return apiService.get(mainUrls.invitation.accept_request(employee_id))
    }
    fired_from_the_company(comapny_id: number, user_id:number): IRes<void> {
        return apiService.get(mainUrls.invitation.fired_from_the_company(comapny_id, user_id))
    }
    leave_company(comapny_id: number): IRes<void> {
        return apiService.get(mainUrls.invitation.leave_company(comapny_id))
    }

}

export const companyActivitiesService = new CompanyActivitiesService()