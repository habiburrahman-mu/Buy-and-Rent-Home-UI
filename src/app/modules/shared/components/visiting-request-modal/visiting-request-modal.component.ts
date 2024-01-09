import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { MessageConstants } from 'src/app/constants/message-constants';
import { DayAvailability } from 'src/app/models/dayAvailability';
import { TimeSlot } from 'src/app/models/timeSlot';
import { VisitingRequestCreateDto } from 'src/app/models/visitingRequestCreateDto';
import { VisitingRequestDetailDto } from 'src/app/models/visitingRequestDetailDto';
import { PropertyService } from 'src/app/services/http/property.service';
import { VisitingRequestService } from 'src/app/services/http/visiting-request.service';
import { ToasterMessageService } from 'src/app/services/utility-services/toaster-message.service';
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

	readonly regexForPhone: RegExp = /^[\+\d]?(?:[\d-.\s()]*)$/;

	selectedDateIndex: any = null;

	date: Date | undefined;

	todayDate = new Date();

	minDate = new Date();
	maxDate = new Date();

	disabledDates: Date[] = [];

	timeSlots: TimeSlot[] = [];
	selectedTimeSlotIndex = -1;
	contactNumber: string | null = null;

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

	visitingRequestDetailDto: VisitingRequestDetailDto | null;

	isDataLoading = false;
	isTakingAppointmentInProgress = false;

	constructor(
		private propertyService: PropertyService,
		private visitingRequestService: VisitingRequestService,
		private toasterMessageService: ToasterMessageService
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

				this.disableOwnerNonAvailableDates();
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
			setTimeout(this.showTimeSlotsForSelectedDate.bind(this, selectedAvailability), 100);
		}
	}

	private showTimeSlotsForSelectedDate(selectedAvailability: DayAvailabilityExtended | undefined) {
		this.timeSlots = selectedAvailability?.availableTimeSlots ?? [];
	}

	onSelectTimeSlot(index: number) {
		this.selectedTimeSlotIndex = index;
	}

	onClickTakeAppointment() {
		this.isTakingAppointmentInProgress = true;
		const visitingRequestCreateDto = this.getVisitingRequestCreateDto();

		this.saveData(visitingRequestCreateDto);

	}

	private getVisitingRequestCreateDto() {
		const selectedDay = this.dayAvailabilityList.find(x => x.index === this.selectedDateIndex)!;
		const selectedTimeSlot = selectedDay.availableTimeSlots[this.selectedTimeSlotIndex];
		let formattedDate = this.createDateFromTimeSlot(selectedDay.date, selectedTimeSlot);

		const visitingRequestCreateDto: VisitingRequestCreateDto = {
			propertyId: this.propertyId,
			dateOn: selectedDay.date,
			startTime: formattedDate[0],
			endTime: formattedDate[1],
			contactNumber: this.contactNumber!
		};
		return visitingRequestCreateDto;
	}

	private createDateFromTimeSlot(dateString: string, timeSlot: TimeSlot) {
		const startDateTime = new Date(dateString);
		const endDateTime = new Date(dateString);

		startDateTime.setHours(0, 0, 0, 0);
		endDateTime.setHours(0, 0, 0, 0);

		const [startTimeSplitted, endTimeSplitted] = [timeSlot.start.split(':'), timeSlot.end.split(':')] as const;
		startDateTime.setHours(+startTimeSplitted[0], +startTimeSplitted[1], +startTimeSplitted[2]);
		endDateTime.setHours(+endTimeSplitted[0], +endTimeSplitted[1], +endTimeSplitted[2]);

		// Return the formatted date string
		const formattedStartDateString = DateTimeUtils.DateToString(startDateTime);
		const formattedEndDateString = DateTimeUtils.DateToString(endDateTime);

		return [formattedStartDateString, formattedEndDateString] as const;
	}

	private saveData(visitingRequestCreateDto: VisitingRequestCreateDto) {
		this.visitingRequestService.create(visitingRequestCreateDto).subscribe({
			next: response => {
				this.toasterMessageService.success(MessageConstants.SaveSuccessful);
				this.isTakingAppointmentInProgress = false;
			},
			error: err => {
				this.isTakingAppointmentInProgress = false;
			}
		});
	}
}

interface DayAvailabilityExtended extends DayAvailability {
	index: number
	dateInDateFormat: Date
}
