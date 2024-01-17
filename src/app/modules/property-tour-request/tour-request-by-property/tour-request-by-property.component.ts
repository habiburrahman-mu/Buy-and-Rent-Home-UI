import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaginationParameter } from 'src/app/models/PaginationParameter';
import { PropertyListDto } from 'src/app/models/propertyListDto';
import VisitingRequestWithPropertyDetailDto from 'src/app/models/visitingRequestWithPropertyDetailDto';
import { PropertyService } from 'src/app/services/http/property.service';
import { VisitingRequestService } from 'src/app/services/http/visiting-request.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-tour-request-by-property',
	templateUrl: './tour-request-by-property.component.html',
	styleUrls: ['./tour-request-by-property.component.css']
})
export class TourRequestByPropertyComponent implements OnInit {

	staticFileUrl: string = environment.baseUrl + environment.staticFilePath;
	defaultImagePath = "assets/images/house_default.png";

	@ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

	selectedPropertyIndex = 0;

	responsiveOptions = [
		{
			breakpoint: '1600px',
			numVisible: 3,
			numScroll: 1
		},
		{
			breakpoint: '1400px',
			numVisible: 3,
			numScroll: 1
		},
		// {
		// 		breakpoint: '1220px',
		// 		numVisible: 1,
		// 		numScroll: 1
		// },
		{
			breakpoint: '600px',
			numVisible: 1,
			numScroll: 1
		}
	];
	myPropertyList: PropertyListDto[] = [];
	isDataLoading = false;

	constructor(
		private propertyService: PropertyService
	) { }

	ngOnInit(): void {
		this.loadMyPropertyList();
	}

	scrollTo() {

	}

	onClickProperty(index: number) {
		this.selectedPropertyIndex = index;
	}

	public scrollRight(): void {
		this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
	}

	public scrollLeft(): void {
		this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
	}

	loadMyPropertyList() {
		this.isDataLoading = true;
		let paginationParams: PaginationParameter = {
			currentPageNo: 1,
			pageSize: 10,
			sortBy: '',
			isDescending: false,
			searchField: '',
			searchingText: ''
		}
		this.propertyService.getMyPropertyPaginatedList(paginationParams).subscribe({
			next: response => {
				this.isDataLoading = false;
				this.myPropertyList = response.resultList;
			},
			error: () => {
				this.isDataLoading = false;
				// this.messageService.add({
				// 		severity: 'error',
				// 		summary: 'Data Loading Error!',
				// 		detail: 'An Error Occurred while Loading Data'
				// });
			}
		});
	}

}
