export interface IMYInvites {
    id: number
    name: string
    phone: string
    email: string
    status: boolean

    employee_id: number
    role: string
    request_status: boolean
    invitation_status: boolean

    created_at: string
    updated_at: string
}

export interface IMyInvitesList {

    invitations_list:IMYInvites[]
}

