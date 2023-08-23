export interface ICompany {
    id?: number;
    name: string
    phone: string
    email: string
    status?: boolean

}

export interface IMyCompany {
    id?: number;
    name: string
    phone: string
    email: string
    status: boolean
    role: string
    employee_id: number
}
