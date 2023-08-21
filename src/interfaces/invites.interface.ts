export interface IInvites {
    id: number,
    user_id: number,
    company_id: number,
    role: string,
    invitation_status: string,
    request_status: string,
    created_at: Date
}

export interface IInvitesList {

    invitations_list:IInvites[]
}

