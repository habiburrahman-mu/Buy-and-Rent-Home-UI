import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

	timeSlots: any[] = [];

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

	products = new Array(10).fill(1).map((x, index) => {
		return {
			index: index,
			date: new Date(),
			name: "",
			timeSlots: [] as any[]
		};
	});

	constructor(
		private propertyService: PropertyService
	) {
		this.minDate.setDate(this.todayDate.getDate() + 1);
		this.maxDate.setDate(this.todayDate.getDate() + 7);
	}

	ngOnInit(): void {
		console.log(this.products);
		this.propertyService.getAvailableSlotsForNext10Days(this.propertyId).subscribe({
			next: (response) => {
				this.products = response.map((x: any, index: number) => {
					return {
						index: index,
						date: new Date(new Date(x.date).toDateString()),
						name: x.day,
						timeSlots: x.availableHours
					}
				});

				this.disableOwnerNonAvailableDates();

				console.log(this.products);
			}
		});

		// console.log(this.todayDate, this.minDate, this.maxDate);
	}

	private disableOwnerNonAvailableDates() {
		let disabledDates: Date[] = [];

		const startDate = new Date(this.minDate);
		const endDate = new Date(this.maxDate);

		let iterator = new Date(startDate);

		while (iterator <= endDate) {
			let dateExist = this.products.some(x => x.date.toDateString() === iterator.toDateString());
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
		let prod = this.products.find(x => x.date.toDateString() === selectedDate.toDateString());
		if (prod) {
			this.selectedDateIndex = prod.index;
			this.timeSlots = prod.timeSlots;
		}
	}
}
