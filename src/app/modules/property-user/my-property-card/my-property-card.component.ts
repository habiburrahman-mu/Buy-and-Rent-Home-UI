import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from "primeng/api";
import { PropertyListDto } from "../../../models/propertyListDto";
import { PropertyService } from 'src/app/services/http/property.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PropertyStatus, SellRent } from 'src/app/constants/enums';

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
	isPropertyStatusUpdateInProgress: boolean;

	sellRent = SellRent;

	constructor(private confirmationService: ConfirmationService,
		private propertyService: PropertyService,
		private messageService: MessageService) {
	}

	ngOnInit(): void {
	}

	onChangeStatus(event: Event) {
		this.confirmationService.confirm({
			message: `Changing property status to ${this.getPropertyStatusLabel(this.nextPropertyStatus)}?`,
			target: event.target ?? undefined,
			key: 'changePropertyStatus' + this.propertyData.id,
			accept: () => {
				// this.approveVisitingRequest();
				this.changeStatus();
			}
		});
	}

	private changeStatus() {
		this.isPropertyStatusUpdateInProgress = true;
		this.propertyService.updatePropertyStatus(this.propertyData.id, this.nextPropertyStatus)
			.subscribe({
				next: response => {
					this.propertyData.status = this.nextPropertyStatus;
					this.isPropertyStatusUpdateInProgress = false;
				},
				error: _ => {
					this.isPropertyStatusUpdateInProgress = false;
				}
			});
	}

	private get nextPropertyStatus() {
		if (this.propertyData.status === PropertyStatus.Draft) return PropertyStatus.Active;
		if (this.propertyData.status === PropertyStatus.Active) return PropertyStatus.Complete;
		return '';
	}

	private getPropertyStatusLabel(statusValue: string) {
		if (statusValue === PropertyStatus.Active) return 'Active';
		if (statusValue === PropertyStatus.Draft) return 'Draft';
		if (statusValue === PropertyStatus.Complete) return (this.propertyData.sellRent === 1 ? 'Sold' : 'Rented');
		return '';
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
