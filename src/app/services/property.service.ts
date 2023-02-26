import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Property } from "../models/Property";
import { PropertyListDto } from "../models/propertyListDto";
import { PropertyDetailDto } from "../models/propertyDetailDto";
import { PaginationParameter } from "../models/PaginationParameter";
import { PageResult } from "../models/PageResult";

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

    getAllProperties(SellRent: number): Observable<PropertyListDto[]> {
        return this.http.get<PropertyListDto[]>(this.serviceBaseUrl + '/list/' + SellRent.toString());
    }

    getMyProperty(): Observable<PropertyListDto[]> {
        return this.http.get<PropertyListDto[]>(this.serviceBaseUrl + '/myProperty/');
    }

    getPropertyPaginatedList(pageParams: PaginationParameter, sellRent: number): Observable<PageResult<PropertyListDto>> {
        let queryParams = new HttpParams({
            fromObject:
            {
                currentPageNo: pageParams.currentPageNo,
                pageSize: pageParams.pageSize,
                sortBy: pageParams.sortBy,
                isDescending: pageParams.isDescending,
                searchField: pageParams.searchField,
                searchingText: pageParams.searchingText,
            }
        });
        return this.http.get<PageResult<PropertyListDto>>(this.serviceBaseUrl + '/propertyPaginatedList/' + sellRent.toString(), { params: queryParams });
    }

    getMyPropertyPaginatedList(pageParams: PaginationParameter): Observable<PageResult<PropertyListDto>> {
        let queryParams = new HttpParams({
            fromObject:
            {
                currentPageNo: pageParams.currentPageNo,
                pageSize: pageParams.pageSize,
                sortBy: pageParams.sortBy,
                isDescending: pageParams.isDescending,
                searchField: pageParams.searchField,
                searchingText: pageParams.searchingText,
            }
        });
        return this.http.get<PageResult<PropertyListDto>>(this.serviceBaseUrl + '/myPropertyPaginatedList/', { params: queryParams });
    }

    getPropertyDetail(id: number): Observable<PropertyDetailDto> {
        return this.http.get<PropertyDetailDto>(this.serviceBaseUrl + '/detail/' + id.toString());
    }

    deleteProperty(id: number): Observable<boolean> {
        return this.http.delete<boolean>(this.serviceBaseUrl + '/delete/' + id.toString());
    }
}
