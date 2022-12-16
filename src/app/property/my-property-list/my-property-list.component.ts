import {Component, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {PropertyListDto} from "../../model/propertyListDto";
import {PaginationParameter} from "../../model/PaginationParameter";

@Component({
    selector: 'app-my-property-list',
    templateUrl: './my-property-list.component.html',
    styleUrls: ['./my-property-list.component.css']
})
export class MyPropertyListComponent implements OnInit {

    showPropertyEditDialog: boolean = false;
    myPropertyList: PropertyListDto[] = [];
    isDataLoading: boolean = false;
    idForEditProperty = 0;

    rowsPerPageOptions: number[] = [5, 10, 20, 30];

    constructor(private propertyService: PropertyService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.loadMyPropertyList();
    }

    private loadMyPropertyList() {
        this.isDataLoading = true;
        let paginationParams: PaginationParameter = {
            currentPageNo: 2,
            pageSize: 5,
            sortBy: '',
            isDescending: false,
            searchField: '',
            searchingText: ''
        }
        this.propertyService.getMyPropertyPaginatedList(paginationParams).subscribe({
            next: response => {
                this.myPropertyList = response.resultList;
                this.isDataLoading = false;

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

    openPropertyEditDialog(propertyId = 0) {
        this.showPropertyEditDialog = true;
        this.idForEditProperty = propertyId;
    }

    onClosePropertyAddDialog(isClosing: boolean) {
        if(isClosing) {
            this.showPropertyEditDialog = false;
            this.loadMyPropertyList();
        }
    }
}
