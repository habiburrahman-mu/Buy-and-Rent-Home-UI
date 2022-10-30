import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment'
import {UserForLogin, UserForRegister} from "../model/user";
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

    isAuthenticated(): boolean {
        const token = localStorage.getItem('brh-token') ?? '';
        const splittedToken = token.split('.');
        if (splittedToken.length === 3) {
            const decodedTokenPayload = atob(splittedToken[1]);
            const expiry = (JSON.parse(decodedTokenPayload))['exp'];
            let isExpired = (Math.floor((new Date).getTime() / 1000)) > expiry;
            if(!isExpired) {
                return true;
            }
        }
        this.logOut();
        return false;
    }

    logOut() {
        localStorage.removeItem('brh-token');
        localStorage.removeItem('brh-userName');
        this.router.navigate(['login']);
    }
}
