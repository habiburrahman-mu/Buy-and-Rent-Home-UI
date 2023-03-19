import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RoleDto } from '../../models/roleDto';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    private serviceBaseUrl = environment.baseUrl + '/role';

    constructor(private httpClient: HttpClient) { }

    getRoleList() {
        return this.httpClient.get<Array<RoleDto>>(this.serviceBaseUrl + '/List');
    }


}
