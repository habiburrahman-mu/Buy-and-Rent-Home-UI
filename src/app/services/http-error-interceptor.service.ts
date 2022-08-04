import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, concatMap, Observable, of, retryWhen, throwError} from "rxjs";
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
                retryWhen(error => this.retryRequest(error, 10)),
                catchError((err: HttpErrorResponse) => {
                    const errorMessage = this.setError(err);
                    console.log(err);
                    this.alertifyService.error(errorMessage);
                    return throwError(errorMessage)
                })
            );
    }

    retryRequest(error: Observable<any>, retryCount: number): Observable<any> {
        return error.pipe(
            concatMap((checkErr: HttpErrorResponse, count: number) => {
                if (checkErr.status === 0 && retryCount <= 10) {
                    return of(checkErr);
                }
                return throwError(checkErr);
            })
        )
    }

    // Retry the request in case of error
    setError(error: HttpErrorResponse): string {
        let errorMessage = "Unknown error occurred";
        if (error.error instanceof ErrorEvent) {
            // Client Side Error
            errorMessage = error.error.message;
        } else {
            if (error.status != 0) {
                // Retry in case WebAPI is down
                errorMessage = error.error.errorMessage;
            }
        }
        return errorMessage;
    }
}
