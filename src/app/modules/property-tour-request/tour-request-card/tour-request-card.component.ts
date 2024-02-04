import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { MessageConstants } from 'src/app/constants/message-constants';
import VisitingRequestConstants from 'src/app/constants/visiting-request-constants';
import VisitingRequestWithPropertyDetailDto from 'src/app/models/visitingRequestWithPropertyDetailDto';
import { VisitingRequestService } from 'src/app/services/http/visiting-request.service';
import { ToasterMessageService } from 'src/app/services/utility-services/toaster-message.service';

@Component({
	selector: 'app-tour-request-card',
	templateUrl: './tour-request-card.component.html',
	styleUrls: ['./tour-request-card.component.css']
})
export class PendingTourRequestCardComponent implements OnInit {

	@Input() visitingRequestWithPropertyDetail: VisitingRequestWithPropertyDetailDto;
	@Input() displayApprovalButtons: boolean;

	readonly visitingRequestStatusList = VisitingRequestConstants.StatusList;

	isAcceptInProgress = false;
	isRejectInProgress = false;

	showCancelPendingTourRequestModal = false;

	private ngDestroyed = new Subject<void>();

	constructor(
		private confirmationService: ConfirmationService,
		private visitingRequestService: VisitingRequestService,
		private toasterMessageService: ToasterMessageService
	) { }

	ngOnInit(): void {
	}

	onApprove(event: Event) {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			icon: 'fa-solid fa-circle-check',
			target: event.target ?? undefined,
			key: 'acceptTourRequest' + this.visitingRequestWithPropertyDetail.visitingRequestId,
			accept: () => {
				this.approveVisitingRequest();
			}
		});
	}

	onCancel(event: Event) {
		this.showCancelPendingTourRequestModal = true;
	}

	onSuccessfulCancelVisitingRequest() {
		this.visitingRequestWithPropertyDetail.status = VisitingRequestConstants.StatusList.find(x => x.label === 'Not Approved')!.value;
		this.displayApprovalButtons = false;
	}

	private approveVisitingRequest() {
		this.isAcceptInProgress = true;
		this.visitingRequestService.approveVisitingRequest(this.visitingRequestWithPropertyDetail.visitingRequestId)
			.pipe(takeUntil(this.ngDestroyed))
			.subscribe({
				next: (response) => {
					this.isAcceptInProgress = false;
					this.toasterMessageService.success(MessageConstants.ApproveSuccessful);
					this.visitingRequestWithPropertyDetail.status = VisitingRequestConstants.StatusList.find(x => x.label === 'Approved')!.value;
					this.displayApprovalButtons = false;
				},
				error: () => {
					this.isAcceptInProgress = false;
				}
			});
	}

	ngOnDestroy(): void {
		this.ngDestroyed.next();
		this.ngDestroyed.complete();
	}

}
