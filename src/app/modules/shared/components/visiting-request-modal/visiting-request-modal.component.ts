import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PropertyService } from 'src/app/services/http/property.service';

@Component({
	selector: 'app-visiting-request-modal',
	templateUrl: './visiting-request-modal.component.html',
	styleUrls: ['./visiting-request-modal.component.css']
})
export class VisitingRequestModalComponent implements OnInit {

	@Input() isVisitingRequestModalVisible = false;
	@Output() isVisitingRequestModalVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

	selectedDateIndex: any = null;

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
	) { }

	ngOnInit(): void {
		console.log(this.products);
		this.propertyService.getAvailableSlotsForNext10Days(1).subscribe({
			next: (response) => {
				this.products = response.map((x: any, index: number) => {
					return {
						index: index,
						date: new Date(x.date),
						name: x.day,
						timeSlots: x.availableHours
					}
				});
			}
		});
	}

	onHideVisitingRequestModalModal() {
		this.isVisitingRequestModalVisible = false;
		this.isVisitingRequestModalVisibleChange.emit(false);
	}

	onClickDateSlot(selectedDay: any) {
		this.selectedDateIndex = selectedDay.index;
		this.timeSlots = selectedDay.timeSlots;
	}
}
