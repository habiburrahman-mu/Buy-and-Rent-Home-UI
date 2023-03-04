import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class HasRoleGuard implements CanActivateChild {
    constructor(
        private authService: AuthService
    ) { }
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let role = this.authService.userRoleList;
        let permittedRoleList = route.data['role'] as string[];

        if (role && permittedRoleList && Array.isArray(permittedRoleList)) {
            if (Array.isArray(role)) {
                if (role.length > 0 && permittedRoleList.length > 0) {
                    return role.some(role => permittedRoleList.includes(role));
                }
            } else {
                return permittedRoleList.includes(role);
            }
        }
        return false;
    }

}
