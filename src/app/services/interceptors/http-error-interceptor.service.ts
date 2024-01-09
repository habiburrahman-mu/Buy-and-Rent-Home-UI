import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, concatMap, Observable, of, retryWhen, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { ErrorCode } from "../../constants/enums";
import { MessageService } from "primeng/api";

@Injectable({
	providedIn: 'root'
})

export class HttpErrorInterceptorService implements HttpInterceptor {
	constructor(private messageService: MessageService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log('Http request started!');
		return next.handle(req)
			.pipe(
				retryWhen(error => this.retryRequest(error, 10)),
				catchError((err: HttpErrorResponse) => {
					const errorMessage = this.setError(err);
					this.messageService.add({
						severity: 'error',
						detail: errorMessage,
					});
					return throwError(errorMessage)
				})
			);
	}

	retryRequest(error: Observable<any>, retryCount: number): Observable<any> {
		return error.pipe(
			concatMap((checkErr: HttpErrorResponse, count: number) => {
				if (count <= retryCount) {
					switch (checkErr.status) {
						case ErrorCode.serverDown:
							return of(checkErr);
					}
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
				if(error.error?.errorMessage) {
					errorMessage = error.error?.errorMessage;
				} else if(error.message) {
					errorMessage = error.message;
				}
			}
		}
		return errorMessage;
	}
}
