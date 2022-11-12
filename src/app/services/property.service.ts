import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Property} from "../model/Property";
import {PropertyListDto} from "../model/propertyListDto";
import {PropertyDetailDto} from "../model/propertyDetailDto";

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

    getMyProperty(): Observable<PropertyListDto[]> {
        return this.http.get<PropertyListDto[]>(this.serviceBaseUrl + '/myProperty/');
    }

    getPropertyDetail(id: number): Observable<PropertyDetailDto> {
        return this.http.get<PropertyDetailDto>(this.serviceBaseUrl + '/detail/' + id.toString());
    }
}
