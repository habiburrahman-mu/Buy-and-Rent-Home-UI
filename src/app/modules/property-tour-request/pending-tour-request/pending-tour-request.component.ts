import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import VisitingRequestWithPropertyDetailDto from 'src/app/models/visitingRequestWithPropertyDetailDto';
import { VisitingRequestService } from 'src/app/services/http/visiting-request.service';

@Component({
	selector: 'app-pending-tour-request',
	templateUrl: './pending-tour-request.component.html',
	styleUrls: ['./pending-tour-request.component.css']
})
export class PendingTourRequestComponent implements OnInit, OnDestroy {

	visitingRequestWithPropertyDetailList: VisitingRequestWithPropertyDetailDto[] = [];

	isDataLoading = false;

	private ngDestroyed = new Subject<void>();

	constructor(
		private visitingRequestService: VisitingRequestService
	) { }

	ngOnInit(): void {
		this.loadData();
	}


	private loadData() {
		this.isDataLoading = true;
		this.visitingRequestService.getVisitingRequestListForMyProperties('P')
			.pipe(takeUntil(this.ngDestroyed))
			.subscribe({
				next: response => {
					this.visitingRequestWithPropertyDetailList = response;
					this.isDataLoading = false;
				},
				error: err => {
					this.isDataLoading = false;
				}
			});
	}

	ngOnDestroy(): void {
		this.ngDestroyed.next();
		this.ngDestroyed.complete();
	}
}
