import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from "../../../services/http/property.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { PropertyListDto } from "../../../models/propertyListDto";
import { PaginationParameter } from "../../../models/PaginationParameter";
import { Paginator } from 'primeng/paginator';

@Component({
    selector: 'app-my-property-list',
    templateUrl: './my-property-list.component.html',
    styleUrls: ['./my-property-list.component.css']
})
export class MyPropertyListComponent implements OnInit {

    @ViewChild('paginator', { static: true }) paginator: Paginator;

    showPropertyEditDialog: boolean = false;
    myPropertyList: PropertyListDto[] = [];
    isDataLoading: boolean = false;
    idForEditProperty = 0;

    rowsPerPageOptions: number[] = [5, 10, 20, 30];

    totalRecords = 0;
    rows = 10;
    currentPage = 0;

    constructor(private propertyService: PropertyService,
        private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.loadMyPropertyList();
    }

    loadMyPropertyList() {
        this.isDataLoading = true;
        let paginationParams: PaginationParameter = {
            currentPageNo: this.currentPage + 1,
            pageSize: this.rows,
            sortBy: '',
            isDescending: false,
            searchField: '',
            searchingText: ''
        }
        this.propertyService.getMyPropertyPaginatedList(paginationParams).subscribe({
            next: response => {
                this.myPropertyList = response.resultList;
                this.isDataLoading = false;
                this.totalRecords = response.totalRecords;
                this.rows = response.pageSize;
            },
            error: (err: HttpErrorResponse) => {
                this.isDataLoading = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Data Loading Error!',
                    detail: 'An Error Occurred while Loading Data'
                });
            }
        });
    }

    onPageChangeInPaginator(event: any) {
        /*
        event.first: Index of first record
        event.rows: Number of rows to display in new page
        event.page: Index of the new page
        event.pageCount: Total number of pages
        */

        console.log(event);
        this.currentPage = event.page;
        this.rows = event.rows;
        this.loadMyPropertyList();
    }

    openPropertyEditDialog(propertyId = 0) {
        this.showPropertyEditDialog = true;
        this.idForEditProperty = propertyId;
    }

    onClosePropertyAddDialog(isClosing: boolean) {
        if (isClosing) {
            this.showPropertyEditDialog = false;
            this.loadMyPropertyList();
        }
    }

    afterDeletingProperty() {
        this.loadMyPropertyList();
    }
}
