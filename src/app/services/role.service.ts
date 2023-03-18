import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParameter } from '../models/PaginationParameter';
import { PageResult } from '../models/PageResult';
import { RoleDto } from '../models/roleDto';
import { Mapper } from '../utils/mapper';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private serviceBaseUrl = environment.baseUrl + '/role';

    constructor(private httpClient: HttpClient) { }

    getRolePaginatedList(paginationParameter: PaginationParameter) {
        let queryParams = Mapper.paginationParameterToHttpParams(paginationParameter);
        return this.httpClient.get<PageResult<RoleDto>>(this.serviceBaseUrl + '/RolePaginatedList', { params: queryParams });
    }


}
