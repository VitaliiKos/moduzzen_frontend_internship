export interface ICompanyMembers {
    id: number;
    username: string;
    email: string;
    city: string;
    phone_number: string
    age: string;
    created_at: string
    updated_at: string


}

export interface ICompanyMembersResp {
    users:ICompanyMembers[]
}
