import { Component, Input, OnInit } from '@angular/core';
import { VisitingRequestDetailDto } from 'src/app/models/visitingRequestDetailDto';

@Component({
	selector: 'app-visiting-request-detail',
	templateUrl: './visiting-request-detail.component.html',
	styleUrls: ['./visiting-request-detail.component.css']
})
export class VisitingRequestDetailComponent implements OnInit {

	@Input() visitingRequestDetail: VisitingRequestDetailDto | null = null;

	constructor() { }

	ngOnInit(): void {
	}

}
