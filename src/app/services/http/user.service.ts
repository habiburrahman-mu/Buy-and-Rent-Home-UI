import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginationParameter } from '../../models/PaginationParameter';
import { Mapper } from '../../utils/mapper';
import { PageResult } from '../../models/PageResult';
import { UserDto } from '../../models/userDto';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private serviceBaseUrl = environment.baseUrl + '/user';

    constructor(private httpClient: HttpClient) { }

    getUserPaginatedList(paginationParameter: PaginationParameter) {
        let queryParams = Mapper.paginationParameterToHttpParams(paginationParameter);
        return this.httpClient.get<PageResult<UserDto>>(this.serviceBaseUrl + '/PaginatedList', { params: queryParams });
    }
}
