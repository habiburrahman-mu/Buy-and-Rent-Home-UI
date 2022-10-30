import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = localStorage['brh-token'];
        if (!token) {
            return next.handle(request);
        }
        const requestWithTokenHeader = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`),
        });
        return next.handle(requestWithTokenHeader);
    }
}
