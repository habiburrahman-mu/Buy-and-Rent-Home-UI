import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
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
	myPropertyList: PropertyListDto[] = [];
	visitingRequestWithPropertyDetailList: VisitingRequestWithPropertyDetailDto[]
	isDataLoading = false;
	isVisitingRequestListLoading = false;

	private ngDestroyed = new Subject<void>();
	private visitingRequestListSubscription$: Subscription | undefined;

	constructor(
		private propertyService: PropertyService,
		private visitingRequestService: VisitingRequestService
	) { }

	ngOnInit(): void {
		this.loadMyPropertyList();
	}

	onClickProperty(index: number) {
		this.selectedPropertyIndex = index;
		this.loadVisitingRequestListWithPropertyDetail(this.myPropertyList[index].id);
	}

	public scrollRight(): void {
		this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
	}

	public scrollLeft(): void {
		this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
	}

	loadMyPropertyList() {
		this.isDataLoading = true;
		this.propertyService.getMyPropertyList()
			.pipe(takeUntil(this.ngDestroyed))
			.subscribe({
				next: response => {
					this.isDataLoading = false;
					this.myPropertyList = response;
					if (response.length > 0) {
						this.onClickProperty(0);
					}
				},
				error: () => {
					this.isDataLoading = false;
				}
			});
	}

	loadVisitingRequestListWithPropertyDetail(propertyId: number) {
		this.isVisitingRequestListLoading = true;

		this.visitingRequestWithPropertyDetailList = [];

		if (this.visitingRequestListSubscription$)
			this.visitingRequestListSubscription$.unsubscribe();

		this.visitingRequestListSubscription$ = this.visitingRequestService.getVisitingRequestListForMyProperties(undefined, propertyId)
			.pipe(takeUntil(this.ngDestroyed))
			.subscribe({
				next: response => {
					this.visitingRequestWithPropertyDetailList = response;
					this.isVisitingRequestListLoading = false;
				},
				error: err => {
					this.isVisitingRequestListLoading = false;
				}
			});
	}

	ngOnDestroy(): void {
		this.ngDestroyed.next();
		this.ngDestroyed.complete();
		this.visitingRequestListSubscription$?.unsubscribe();
	}

}
