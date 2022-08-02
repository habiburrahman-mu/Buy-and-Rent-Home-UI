import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AlertifyService} from "./alertify.service";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class HttpErrorInterceptorService implements HttpInterceptor {
    constructor(private alertifyService: AlertifyService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Http request started!');
        return next.handle(req)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    const errorMessage = this.setError(err);
                    console.log(err);
                    this.alertifyService.error(errorMessage);
                    return throwError(errorMessage)
                })
            );
    }

    setError(error: HttpErrorResponse): string {
        let errorMessage = "Unknown error occurred";
        if (error.error instanceof ErrorEvent) {
            // Client Side Error
            errorMessage = error.error.message;
        } else {
            if (error.status != 0) {
                errorMessage = error.error.errorMessage;
            }
        }
        return errorMessage;
    }
}
