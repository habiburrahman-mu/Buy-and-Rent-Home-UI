import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment'
import {UserForLogin, UserForRegister} from "../models/user";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    baseUrl = environment.baseUrl;
    loggedInUser: string;

    constructor(private http: HttpClient, private router: Router) {
    }

    get tokenInLocalStorage() { return localStorage.getItem('brh-token') ?? '';}

    authUser(user: UserForLogin): Observable<any> {
        return this.http.post(this.baseUrl + '/account/login', user);
    }

    registerUser(user: UserForRegister) {
        return this.http.post(this.baseUrl + '/account/register', user);
    }

    isLoggedIn() {
        this.loggedInUser = localStorage.getItem('brh-userName') ?? '';
        return this.loggedInUser != '';
    }

    get decodedTokenPayload() {
        const token = this.tokenInLocalStorage;
        const splittedToken = token.split('.');
        if (splittedToken.length === 3) {
            const decodedTokenPayload = atob(splittedToken[1]);
            return decodedTokenPayload;
        }
        return null;
    }

    get userRoleList() {
        const decodedTokenPayload = this.decodedTokenPayload;
        if (decodedTokenPayload) {
            var roleList = (JSON.parse(decodedTokenPayload))['role'];
            return roleList;
        }
        return [];
    }

    isAuthenticated(): boolean {
        const decodedTokenPayload = this.decodedTokenPayload;
        if (decodedTokenPayload) {
            var isExpired = this.isExpired(decodedTokenPayload);
            if(isExpired) {
                this.logOut();
            }
            return !isExpired;
        }
        this.logOut();
        return false;
    }

    isExpired(decodedTokenPayload: string) {
        const expiry = (JSON.parse(decodedTokenPayload))['exp'];
        let isExpired = (Math.floor((new Date).getTime() / 1000)) > expiry;
        return isExpired === true;
    }

    logOut(navigateToLogin: boolean = true) {
        localStorage.removeItem('brh-token');
        localStorage.removeItem('brh-userName');
        if(navigateToLogin) {
            this.router.navigate(['login']);
        }
    }
}
