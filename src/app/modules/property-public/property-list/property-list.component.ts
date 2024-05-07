import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/http/property.service';
import { PropertyListDto } from 'src/app/models/propertyListDto';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationParameter } from 'src/app/models/PaginationParameter';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Mapper } from 'src/app/utils/mapper';
import { Paginator } from 'primeng/paginator';
import { PrimeNgPaginatorEventParams } from 'src/app/models/primeNgPaginatorEventParams';

@Component({
	selector: 'app-property-list',
	templateUrl: './property-list.component.html',
	styleUrls: ['./property-list.component.css']
})



export class PropertyListComponent implements OnInit, AfterViewInit {
	@ViewChild('containerCard') containerCardRef: ElementRef;
	@ViewChild('paginator', { static: true }) paginator: Paginator;

	widthOfContainerCard = 0;
	skeletonCardSize = 270;
	skeletonCard = new Array<number>(4).fill(0);
	tabMenuItems: MenuItem[] = [
		{ label: "Buy", icon: '', routerLink: '../buy' },
		{ label: "Rent", icon: '', routerLink: '../rent' },
	];
	activeTabMenu: MenuItem;
	SellRent = 1;
	propertyList: PropertyListDto[];
	sortByParameter: string = 'City';
	sortDirection: string = 'asc';

	sortOptions = [
		{ label: 'City', value: 'City' },
		{ label: 'Price', value: 'Price' }
	];

	rowsPerPageOptions: number[] = [1, 2, 5, 10, 20, 30];
	totalRecords = 0;
	rows = 10;
	currentPage = 1;
	searchingText: string = "";

	isLoading = false;

	constructor(
		private route: ActivatedRoute,
		private propertyService: PropertyService,
		private elementRef: ElementRef
	) { }

	ngOnInit(): void {
		this.activeTabMenu = this.tabMenuItems[0];
		let buyOrRent = this.route.snapshot.url.toString();
		if (buyOrRent === 'buy') {
			this.SellRent = 1; // Means we are on rent-property URL else we are on base URL
		} else if (buyOrRent === 'rent') {
			this.SellRent = 2;
		}
		let paginationParamsInitial: PaginationParameter = {
			currentPageNo: 1,
			pageSize: this.rows,
			sortBy: '',
			isDescending: false,
			searchField: '',
			searchingText: this.searchingText
		};
		this.loadData(paginationParamsInitial);
	}

	ngAfterViewInit(): void {
		this.widthOfContainerCard = parseInt(this.containerCardRef.nativeElement.clientWidth) ?? 0;
		this.calculateSkeletonCardNumber();
	}

	@HostListener('window:resize')
	onResizeHandler() {
		this.widthOfContainerCard = parseInt(this.elementRef.nativeElement.offsetWidth) ?? 0;
		this.calculateSkeletonCardNumber();
	}

	onPaginatorPageChange(event: PrimeNgPaginatorEventParams) {
		this.currentPage = event.page;
		this.rows = event.rows
		console.log(event);
		let paginationParams = Mapper.paginatorEventToPaginationParameter(event);
		paginationParams.searchField = '';
		paginationParams.searchingText = this.searchingText;
		this.loadData(paginationParams);
	}

	loadData(paginationParams: PaginationParameter) {
		this.isLoading = true;
		this.propertyService.getPropertyPaginatedList(paginationParams, this.SellRent).subscribe({
			next: (data) => {
				this.propertyList = data.resultList;
				this.totalRecords = data.totalRecords;
				this.currentPage = data.pageNo;
				this.rows = data.pageSize;
				this.isLoading = false;
			},
			error: (err: HttpErrorResponse) => {
				this.isLoading = false;
			}
		});
	}


	onSearch() {
		var paginationParameter: PaginationParameter = {
			currentPageNo: 1,
			pageSize: this.rows,
			sortBy: '',
			isDescending: false,
			searchField: '',
			searchingText: this.searchingText
		};
		this.loadData(paginationParameter);
		setTimeout(() => this.paginator.changePageToFirst(null));
	}

	calculateSkeletonCardNumber() {
		let cardNumber = Math.floor(this.widthOfContainerCard / this.skeletonCardSize);
		if (cardNumber > 4) {
			this.skeletonCard = new Array<number>(cardNumber).fill(0);
		}

	}
}
