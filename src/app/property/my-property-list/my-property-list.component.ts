import {Component, OnInit} from '@angular/core';
import {PropertyService} from "../../services/property.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {PropertyListDto} from "../../model/propertyListDto";

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

    constructor(private propertyService: PropertyService,
                private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.loadMyPropertyList();
    }

    private loadMyPropertyList() {
        this.isDataLoading = true;
        this.propertyService.getMyProperty().subscribe({
            next: response => {
                this.myPropertyList = response;
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
}
