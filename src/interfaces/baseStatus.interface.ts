export interface IBaseStatus {
    postgres_status: boolean,
    redis_status: {status: string}
}