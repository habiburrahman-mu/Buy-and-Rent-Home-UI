import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParameter } from '../models/PaginationParameter';
import { PageResult } from '../models/PageResult';
import { RoleDto } from '../models/roleDto';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private serviceBaseUrl = environment.baseUrl + '/role';

    constructor(private httpClient: HttpClient) { }

    getRolePaginatedList(paginationParameter: PaginationParameter) {
        let queryParams = new HttpParams({
            fromObject:
            {
                currentPageNo: paginationParameter.currentPageNo,
                pageSize: paginationParameter.pageSize,
                sortBy: paginationParameter.sortBy,
                isDescending: paginationParameter.isDescending,
                searchField: paginationParameter.searchField,
                searchingText: paginationParameter.searchingText,
            }
        });
        return this.httpClient.get<PageResult<RoleDto>>(this.serviceBaseUrl + '/RolePaginatedList', {params: queryParams});
    }


}
