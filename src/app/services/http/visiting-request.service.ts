import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VisitingRequestCreateDto } from 'src/app/models/visitingRequestCreateDto';
import { VisitingRequestDetailDto } from 'src/app/models/visitingRequestDetailDto';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class VisitingRequestService {

	private serviceBaseUrl = environment.baseUrl + '/VisitingRequest';

	constructor(private http: HttpClient) { }

	create(visitingRequestCreateDto: VisitingRequestCreateDto) {
		return this.http.post<number>(this.serviceBaseUrl + '/create', visitingRequestCreateDto);
	}

	getVisitingRequestDetailForCurrentUser(propertyId: number) {
		return this.http.get<VisitingRequestDetailDto>(this.serviceBaseUrl + '/GetVisitingRequestDetailForCurrentUser/' + propertyId.toString());
	}
}
