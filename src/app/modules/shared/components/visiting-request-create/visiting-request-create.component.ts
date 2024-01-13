import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DayAvailability } from 'src/app/models/dayAvailability';
import { TimeSlot } from 'src/app/models/timeSlot';
import DayAvailabilityExtended from '../../models/dayAvailabilityExtended';
import { DateTimeUtils } from 'src/app/utils/date-time-utils';
import { VisitingRequestCreateDto } from 'src/app/models/visitingRequestCreateDto';
import { VisitingRequestService } from 'src/app/services/http/visiting-request.service';
import { ToasterMessageService } from 'src/app/services/utility-services/toaster-message.service';
import { MessageConstants } from 'src/app/constants/message-constants';
import { VisitingRequestDetailDto } from 'src/app/models/visitingRequestDetailDto';

@Component({
	selector: 'app-visiting-request-create',
	templateUrl: './visiting-request-create.component.html',
	styleUrls: ['./visiting-request-create.component.css']
})
export class VisitingRequestCreateComponent implements OnInit, OnChanges {

	@Input() isVisitingRequestModalVisible: boolean;
	@Input() propertyId: number;
	@Input() dayAvailabilityList: DayAvailabilityExtended[] = [];
	@Output() afterSuccessfulSave: EventEmitter<VisitingRequestDetailDto> = new EventEmitter<VisitingRequestDetailDto>();

	regexForPhone: RegExp =  new RegExp('^[0-9]*$');

	date: Date;

	selectedDateIndex: any = null;

	todayDate = new Date();
	minDate = new Date();
	maxDate = new Date();

	disabledDates: Date[] = [];

	timeSlots: TimeSlot[] = [];
	selectedTimeSlotIndex = -1;
	contactNumber: string | null = null;

	// visitingRequestDetailDto: VisitingRequestDetailDto | null;

	isTakingAppointmentInProgress = false;

	constructor(
		private visitingRequestService: VisitingRequestService,
		private toasterMessageService: ToasterMessageService
	) {
		this.minDate.setDate(this.todayDate.getDate() + 1);
		this.maxDate.setDate(this.todayDate.getDate() + 7);
	}

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['dayAvailabilityList']?.currentValue) {
			this.disableOwnerNonAvailableDates();
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
				this.afterSuccessfulSave.emit(response);
			},
			error: err => {
				this.isTakingAppointmentInProgress = false;
			}
		});
	}

}

