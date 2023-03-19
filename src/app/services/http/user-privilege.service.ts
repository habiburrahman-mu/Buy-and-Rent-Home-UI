import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserPrivilegeSaveDto } from 'src/app/models/userPrivilegeSaveDto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserPrivilegeService {
    private serviceBaseUrl = environment.baseUrl + '/userPrivilege';

    constructor(private httpClient: HttpClient) { }

    saveUserPrivilege(userPrivilegeSaveDto: UserPrivilegeSaveDto) {
        return this.httpClient.post<boolean>(this.serviceBaseUrl + '/Save', userPrivilegeSaveDto);
    }

}
