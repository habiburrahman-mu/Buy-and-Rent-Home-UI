import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Property } from "../../models/Property";
import { PropertyListDto } from "../../models/propertyListDto";
import { PropertyDetailDto } from "../../models/propertyDetailDto";
import { PaginationParameter } from "../../models/PaginationParameter";
import { PageResult } from "../../models/PageResult";
import { DayAvailability } from 'src/app/models/dayAvailability';

@Injectable({
	providedIn: 'root'
})
export class PropertyService {

	private serviceBaseUrl = environment.baseUrl + '/property';

	constructor(private http: HttpClient) {
	}

	saveProperty(property: Property): Observable<number> {
		return this.http.post<number>(this.serviceBaseUrl + '/save', property);
	}

	getAllProperties(SellRent: number): Observable<PropertyListDto[]> {
		return this.http.get<PropertyListDto[]>(this.serviceBaseUrl + '/list/' + SellRent.toString());
	}

	getMyPropertyList(): Observable<PropertyListDto[]> {
		return this.http.get<PropertyListDto[]>(this.serviceBaseUrl + '/myPropertyList/');
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

	getAvailableSlotsForNext7Days(id: number) {
		return this.http.get<DayAvailability[]>(this.serviceBaseUrl + '/getAvailableSlotsForNext7Days/' + id.toString());
	}

	updatePropertyStatus(id: number, status: string) {
		return this.http.put<boolean>(this.serviceBaseUrl + '/updatePropertyStatus', { id, status });
	}
}
