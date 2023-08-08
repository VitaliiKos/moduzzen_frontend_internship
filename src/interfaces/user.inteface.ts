export interface IUser {
    id?: number;
    username: string;
    email: string;
    password?: string,
    city: string;
    phone_number: string
    age: string;
    created_at?: string
    updated_at?: string


}

export interface IUserResp {
    users:IUser[]
}
