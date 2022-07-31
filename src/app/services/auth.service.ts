import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment'
import {UserForLogin} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    authUser(user: UserForLogin): Observable<any> {
        return this.http.post(this.baseUrl + '/account/login', user);
    }
}
