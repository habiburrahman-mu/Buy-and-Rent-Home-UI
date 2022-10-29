import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    serviceBaseUrl = environment.baseUrl + '/photo';

    constructor(private http: HttpClient) {
    }

    uploadPhotos(propertyId: number, formData: FormData): Observable<boolean> {
        return this.http.post<boolean>(this.serviceBaseUrl + '/Save/' + propertyId, formData);
    }
}
