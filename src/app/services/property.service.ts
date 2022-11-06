import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Property} from "../model/Property";

@Injectable({
    providedIn: 'root'
})
export class PropertyService {

    serviceBaseUrl = environment.baseUrl + '/property';

    constructor(private http: HttpClient) {
    }

    addProperty(property: Property): Observable<number> {
        return this.http.post<number>(this.serviceBaseUrl + '/addNew', property);
    }

    getAllProperties(SellRent: number): Observable<Property[]> {
        return this.http.get<Property[]>(this.serviceBaseUrl + '/list/' + SellRent.toString());
    }

    getMyProperty(): Observable<Property[]> {
        return this.http.get<Property[]>(this.serviceBaseUrl + '/myProperty/');
    }

    getProperty(id: number): Observable<Property> {
        return this.http.get<Property>(this.serviceBaseUrl + '/detail/' + id.toString());
    }
}
