import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { PropertyListDto } from 'src/app/models/propertyListDto';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginationParameter } from 'src/app/models/PaginationParameter';

@Component({
    selector: 'app-property-list',
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
    SellRent = 1;
    propertyList: PropertyListDto[];
    city: string = '';
    searchCity: string = '';
    sortByParameter: string = 'City';
    sortDirection: string = 'asc';

    emptyArray = new Array(10);

    sortOptions = [
        { label: 'City', value: 'City' },
        { label: 'Price', value: 'Price' }
    ];

    rowsPerPageOptions: number[] = [5, 10, 20, 30];
    totalRecords = 0;
    rows = 10;
    currentPage = 0;

    constructor(
        private route: ActivatedRoute,
        private propertyService: PropertyService
    ) { }

    ngOnInit(): void {
        let buyOrRent = this.route.snapshot.url.toString();
        if (buyOrRent === 'buy') {
            this.SellRent = 1; // Means we are on rent-property URL else we are on base URL
        } else if (buyOrRent === 'rent') {
            this.SellRent = 2;
        }

        let paginationParams: PaginationParameter = {
            currentPageNo: this.currentPage + 1,
            pageSize: this.rows,
            sortBy: '',
            isDescending: false,
            searchField: '',
            searchingText: ''
        };

        this.propertyService.getPropertyPaginatedList(paginationParams, this.SellRent).subscribe(
            {
                next: (data) => {
                    this.propertyList = data.resultList;
                    this.totalRecords = data.totalRecords;
                    this.rows = data.pageSize;
                },
                error: (err: HttpErrorResponse) => {
                    console.log('http error:');
                    console.log(err);
                }
            }
        );
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
}
