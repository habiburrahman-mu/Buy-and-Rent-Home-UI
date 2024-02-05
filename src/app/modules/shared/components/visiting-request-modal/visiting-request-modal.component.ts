import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { VisitingRequestDetailDto } from 'src/app/models/visitingRequestDetailDto';
import { PropertyService } from 'src/app/services/http/property.service';
import { VisitingRequestService } from 'src/app/services/http/visiting-request.service';
import DayAvailabilityExtended from '../../models/dayAvailabilityExtended';
import { DateTimeUtils } from 'src/app/utils/date-time-utils';

@Component({
	selector: 'app-visiting-request-modal',
	templateUrl: './visiting-request-modal.component.html',
	styleUrls: ['./visiting-request-modal.component.css']
})
export class VisitingRequestModalComponent implements OnInit {

	@Input() isVisitingRequestModalVisible = false;
	@Input() propertyId: number;
	@Output() isVisitingRequestModalVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	dayAvailabilityList: DayAvailabilityExtended[];

	visitingRequestDetailDto: VisitingRequestDetailDto | null;

	isDataLoading = false;

	constructor(
		private propertyService: PropertyService,
		private visitingRequestService: VisitingRequestService,
	) {}

	ngOnInit(): void {
		this.loadDataFromServer(true);
	}

	private loadDataFromServer(isForceRefresh = false) {
		this.isDataLoading = true;
		forkJoin([
			this.visitingRequestService.getVisitingRequestDetailForCurrentUser(this.propertyId),
			this.loadAvailableSlotsForNext7Days$(isForceRefresh),
		]).subscribe({
			next: (response) => {
				this.visitingRequestDetailDto = response[0];
				this.dayAvailabilityList = response[1].map((x, index: number) => {
					let dayAvailability: DayAvailabilityExtended = {
						...x,
						index,
						dateInDateFormat: new Date(new Date(x.date).toDateString()),
					}
					return dayAvailability;
				});

				this.isDataLoading = false;
			},
			error: (err) => {
				this.isDataLoading = false;
			},
		})
	}

	private loadAvailableSlotsForNext7Days$(isForceRefresh = false) {
		if (this.dayAvailabilityList && !isForceRefresh) {
			return of(this.dayAvailabilityList);
		} else {
			return this.propertyService.getAvailableSlotsForNext7Days(this.propertyId);
		}
	}

	onHideVisitingRequestModalModal() {
		this.isVisitingRequestModalVisible = false;
		this.isVisitingRequestModalVisibleChange.emit(false);
	}

	afterTakingTour(visitingRequestDetailDto: VisitingRequestDetailDto) {
		this.visitingRequestDetailDto = visitingRequestDetailDto;
	}

}
