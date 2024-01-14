import { Component, Input, OnInit } from '@angular/core';
import VisitingRequestConstants from 'src/app/constants/visiting-request-constants';
import { VisitingRequestDetailDto } from 'src/app/models/visitingRequestDetailDto';

@Component({
	selector: 'app-visiting-request-detail',
	templateUrl: './visiting-request-detail.component.html',
	styleUrls: ['./visiting-request-detail.component.css']
})
export class VisitingRequestDetailComponent implements OnInit {

	@Input() visitingRequestDetail: VisitingRequestDetailDto | null = null;

	readonly visitingRequestStatusList = VisitingRequestConstants.StatusList;

	constructor() { }

	ngOnInit(): void {
	}

}
