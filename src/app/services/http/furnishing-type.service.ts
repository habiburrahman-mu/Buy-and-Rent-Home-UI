import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {IKeyValuePair} from "../../models/ikeyvaluepair";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class FurnishingTypeService {

    serviceBaseUrl = environment.baseUrl + '/FurnishingType';

    constructor(private http: HttpClient) {
    }

    getFurnishingTypes(): Observable<IKeyValuePair[]> {
        return this.http.get<IKeyValuePair[]>(this.serviceBaseUrl + '/list');
    }
}
