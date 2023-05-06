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
    city: string = '';
    searchCity: string = '';
    sortByParameter: string = 'City';
    sortDirection: string = 'asc';

    sortOptions = [
        { label: 'City', value: 'City' },
        { label: 'Price', value: 'Price' }
    ];

    rowsPerPageOptions: number[] = [1, 2, 5, 10, 20, 30];
    totalRecords = 0;
    rows = 10;
    currentPage = 0;

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
            searchingText: ''
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

    onPaginatorPageChange(event:PrimeNgPaginatorEventParams) {
        this.currentPage = event.page;
        this.rows = event.rows
        console.log(event);
        let paginationParams = Mapper.paginatorEventToPaginationParameter(event);
        this.loadData(paginationParams);
    }

    loadData(paginationParams: PaginationParameter) {
        this.isLoading = true;
        this.propertyService.getPropertyPaginatedList(paginationParams, this.SellRent).subscribe({
            next: (data) => {
                this.propertyList = data.resultList;
                this.totalRecords = data.totalRecords;
                this.rows = data.pageSize;
                this.isLoading = false;
            },
            error: (err: HttpErrorResponse) => {
                this.isLoading = false;
            }
        });
    }

    onCityFilter(clear: boolean = false) {
        if (clear) {
            this.city = '';
        }
        this.searchCity = this.city;
    }

    onSortDirection() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    calculateSkeletonCardNumber() {
        let cardNumber = Math.floor(this.widthOfContainerCard / this.skeletonCardSize);
        if (cardNumber > 4) {
            this.skeletonCard = new Array<number>(cardNumber).fill(0);
        }

    }
}
