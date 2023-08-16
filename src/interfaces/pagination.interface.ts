export interface IPagination<T> {
    total_item: number;
    total_page: number;
    data: T;
}