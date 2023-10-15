import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { DayAvailability } from 'src/app/models/dayAvailability';
import { TimeSlot } from 'src/app/models/timeSlot';
import { PropertyService } from 'src/app/services/http/property.service';

@Component({
	selector: 'app-visiting-request-modal',
	templateUrl: './visiting-request-modal.component.html',
	styleUrls: ['./visiting-request-modal.component.css']
})
export class VisitingRequestModalComponent implements OnInit {

	@Input() isVisitingRequestModalVisible = false;
	@Input() propertyId: number;
	@Output() isVisitingRequestModalVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	selectedDateIndex: any = null;

	date: Date | undefined;

	todayDate = new Date();

	minDate = new Date();
	maxDate = new Date();

	disabledDates: Date[] = [];

	timeSlots: TimeSlot[] = [];
	selectedTimeSlotIndex = -1;

	responsiveOptions: any[] = [
		// {
		// 	breakpoint: '1400px',
		// 	numVisible: 4,
		// 	numScroll: 3
		// },
		// {
		// 	breakpoint: '1220px',
		// 	numVisible: 3,
		// 	numScroll: 2
		// },
		// {
		// 	breakpoint: '1100px',
		// 	numVisible: 1,
		// 	numScroll: 1
		// }
	];

	dayAvailabilityList: DayAvailabilityExtended[];

	isDataLoading = false;

	constructor(
		private propertyService: PropertyService
	) {
		this.minDate.setDate(this.todayDate.getDate() + 1);
		this.maxDate.setDate(this.todayDate.getDate() + 7);
	}

	ngOnInit(): void {
		this.loadDataFromServer(true);
	}

	private loadDataFromServer(isForceRefresh = false) {
		this.isDataLoading = true;
		forkJoin([
			this.loadAvailableSlotsForNext7Days$(isForceRefresh)
		]).subscribe({
			next: (response) => {
				this.dayAvailabilityList = response[0].map((x, index: number) => {
					let dayAvailability: DayAvailabilityExtended = {
						...x,
						index,
						dateInDateFormat: new Date(new Date(x.date).toDateString()),
					}
					return dayAvailability;
				});

				this.disableOwnerNonAvailableDates();
			},
			complete: () => {
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

	private disableOwnerNonAvailableDates() {
		let disabledDates: Date[] = [];

		const startDate = new Date(this.minDate);
		const endDate = new Date(this.maxDate);

		let iterator = new Date(startDate);

		while (iterator <= endDate) {
			let dateExist = this.dayAvailabilityList.some(x => x.dateInDateFormat.toDateString() === iterator.toDateString());
			if (!dateExist) {
				disabledDates.push(new Date(iterator));
			}
			iterator.setDate(iterator.getDate() + 1);
		}

		this.disabledDates = disabledDates;
	}

	onHideVisitingRequestModalModal() {
		this.isVisitingRequestModalVisible = false;
		this.isVisitingRequestModalVisibleChange.emit(false);
	}

	onClickDateSlot(selectedDay: any) {
		this.selectedDateIndex = selectedDay.index;
		this.timeSlots = selectedDay.timeSlots;
	}

	onSelectDate(selectedDate: Date) {
		console.log(selectedDate, selectedDate.toDateString());
		this.selectedTimeSlotIndex = -1;
		let selectedAvailability = this.dayAvailabilityList.find(x => x.dateInDateFormat.toDateString() === selectedDate.toDateString());
		if (selectedAvailability) {
			this.selectedDateIndex = selectedAvailability.index;
			this.timeSlots = [];
			setTimeout(this.test.bind(this, selectedAvailability), 100);
		}
	}

	private test(selectedAvailability: DayAvailabilityExtended | undefined) {
		console.log(selectedAvailability);
		this.timeSlots = selectedAvailability?.availableTimeSlots ?? [];
	}

	onSelectTimeSlot(index: number) {
		this.selectedTimeSlotIndex = index;
	}
}

interface DayAvailabilityExtended extends DayAvailability {
	index: number
	dateInDateFormat: Date
}
