import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country} from "../../models/country";

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    serviceBaseUrl = environment.baseUrl + '/country';

    constructor(private http: HttpClient) {
    }

    getAllCountries(): Observable<Country[]> {
        return this.http.get<Country[]>(this.serviceBaseUrl + '/list');
    }
}
