export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string,
    city: string;
    phone_number: string
    age: string;


}

export interface IUserResp {
    age: string;
    city: string;
    created_at: string
    email: string;
    id: number;
    phone_number: string
    updated_at: string
    username: string;
}