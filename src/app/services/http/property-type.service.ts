import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IKeyValuePair} from "../../models/ikeyvaluepair";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PropertyTypeService {

    serviceBaseUrl = environment.baseUrl + '/PropertyType';

    constructor(private http: HttpClient) {
    }

    getPropertyTypes(): Observable<IKeyValuePair[]> {
        return this.http.get<IKeyValuePair[]>(this.serviceBaseUrl + '/list');
    }
}
