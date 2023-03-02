import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { PropertyListDto } from "../../../models/propertyListDto";
import { PropertyService } from 'src/app/services/property.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SellRent } from 'src/app/enums/enums';

@Component({
    selector: 'app-my-property-card',
    templateUrl: './my-property-card.component.html',
    styleUrls: ['./my-property-card.component.css']
})
export class MyPropertyCardComponent implements OnInit {
    @Input() propertyData: PropertyListDto;
    @Output() openPropertyEditDialogEvent = new EventEmitter<boolean>();
    @Output() afterDeletePropertyEvent = new EventEmitter<void>();

    staticFileUrl: string = environment.baseUrl + environment.staticFilePath;
    defaultImagePath = "assets/images/house_default.png";

    isDeleteInProgress: boolean;

    sellRent = SellRent;

    constructor(private confirmationService: ConfirmationService,
        private propertyService: PropertyService,
        private messageService: MessageService) {
    }

    ngOnInit(): void {
    }


    openPropertyEditDialog() {
        this.openPropertyEditDialogEvent.emit(true);
    }

    onClickDeleteProperty() {
        if (this.propertyData?.id) {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to delete this property?',
                header: 'Delete ' + this.propertyData.name,
                icon: 'pi pi-exclamation-triangle',
                accept: this.deleteProperty.bind(this),
                key: "deletePropertyDialog"
            });
        }
    }

    deleteProperty() {
        this.isDeleteInProgress = true;
        this.propertyService.deleteProperty(this.propertyData.id).subscribe({
            next: response => {
                if (response) {
                    this.afterDeletePropertyEvent.emit();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Deleted Successfully',
                        detail: 'Property Deleted Successfully'
                    });
                } else {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Something Wrong!',
                        detail: 'Something went wrong while deleting the property'
                    });
                }

            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'An Error Ocurred',
                    detail: 'An error ocurred while deleting the property'
                });
            },
            complete: () => {
                this.isDeleteInProgress = false;
            }
        });
    }
}
