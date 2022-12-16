export interface PageResult<T> {
    pageNo: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    resultList: T[];
}
