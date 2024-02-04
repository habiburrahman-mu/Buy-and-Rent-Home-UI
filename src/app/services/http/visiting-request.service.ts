import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CancelVisitingRequestDto from 'src/app/models/cancelVisitingRequestDto';
import { VisitingRequestCreateDto } from 'src/app/models/visitingRequestCreateDto';
import { VisitingRequestDetailDto } from 'src/app/models/visitingRequestDetailDto';
import VisitingRequestWithPropertyDetailDto from 'src/app/models/visitingRequestWithPropertyDetailDto';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class VisitingRequestService {

	private serviceBaseUrl = environment.baseUrl + '/VisitingRequest';

	constructor(private http: HttpClient) { }

	create(visitingRequestCreateDto: VisitingRequestCreateDto) {
		return this.http.post<VisitingRequestDetailDto>(this.serviceBaseUrl + '/create', visitingRequestCreateDto);
	}

	getVisitingRequestDetailForCurrentUser(propertyId: number) {
		return this.http.get<VisitingRequestDetailDto>(this.serviceBaseUrl + '/GetVisitingRequestDetailForCurrentUser/' + propertyId.toString());
	}

	getVisitingRequestListForMyProperties(status: string | undefined = undefined, propertyId: number | undefined = undefined) {

		let params: { [key: string]: string | number } = {};
		if (status)
			params['status'] = status;
		if (propertyId)
			params['propertyId'] = propertyId;

		const httpsParams = new HttpParams({
			fromObject: params
		})

		return this.http.get<VisitingRequestWithPropertyDetailDto[]>(this.serviceBaseUrl + '/GetVisitingRequestListForMyProperties', { params: httpsParams });
	}

	approveVisitingRequest(visitingRequestId: number) {
		return this.http.put<boolean>(this.serviceBaseUrl + '/ApproveVisitingRequest', visitingRequestId);
	}

	cancelVisitingRequest(cancelVisitingRequestDto: CancelVisitingRequestDto) {
		return this.http.put<boolean>(this.serviceBaseUrl + '/cancelVisitingRequest', cancelVisitingRequestDto);
	}
}
