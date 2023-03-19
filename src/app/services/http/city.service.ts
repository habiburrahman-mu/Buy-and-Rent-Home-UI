import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {City} from "../../models/city";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CityService {
    serviceBaseUrl = environment.baseUrl + '/city';

    constructor(private http: HttpClient) {
    }

    getAllCities(): Observable<City[]> {
        return this.http.get<City[]>(this.serviceBaseUrl + '/list');
    }

    getAllCityByCountry(countryId: number): Observable<City[]> {
        return this.http.get<City[]>(this.serviceBaseUrl + '/list/' + countryId);
    }
}
