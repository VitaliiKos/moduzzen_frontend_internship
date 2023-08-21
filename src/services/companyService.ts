import {apiService} from '.';
import {ICompanyRole} from '../Store/slice';

import {mainUrls} from '../config';
import {IPagination, ICompany} from '../interfaces';
import {IRequest} from '../interfaces/request.interface';
import {IRes} from '../types';


class CompanyService {
    getAll({skip = 0}: IRequest): IRes<IPagination<ICompany[]>> {
        return apiService.get(mainUrls.company.company, {params: {skip}})
    }

    getMyCompany({skip = 0}: IRequest): IRes<IPagination<ICompany[]>> {
        return apiService.get(mainUrls.company.my_companiees, {params: {skip}})
    }

    getById(id: number): IRes<ICompany> {
        return apiService.get(mainUrls.company.byId(id))
    }

    getUserRole(id: number): IRes<ICompanyRole> {
        return apiService.get(mainUrls.company.ger_user_role(id))
    }

    create(company: ICompany): IRes<ICompany> {
        return apiService.post(mainUrls.company.company, company)
    }

    updateById(id: number, cacompany: ICompany): IRes<ICompany> {
        return apiService.patch(mainUrls.company.byIdInfo(id), cacompany)
    }

    deleteById(id: number): IRes<void> {
        return apiService.delete(mainUrls.company.byId(id))
    }

}

export const companyService = new CompanyService()