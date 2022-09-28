import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment'
import {UserForLogin, UserForRegister} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseUrl = environment.baseUrl;
    loggedInUser: string;

    constructor(private http: HttpClient) {
    }

    authUser(user: UserForLogin): Observable<any> {
        return this.http.post(this.baseUrl + '/account/login', user);
    }

    registerUser(user: UserForRegister) {
        return this.http.post(this.baseUrl + '/account/register', user);
    }

    isLoggedIn() {
        this.loggedInUser = localStorage.getItem('brh-userName')??'';
        return this.loggedInUser != '';
    }
}
