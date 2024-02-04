import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MessageConstants } from 'src/app/constants/message-constants';
import VisitingRequestConstants from 'src/app/constants/visiting-request-constants';
import CancelVisitingRequestDto from 'src/app/models/cancelVisitingRequestDto';
import { VisitingRequestService } from 'src/app/services/http/visiting-request.service';
import { ToasterMessageService } from 'src/app/services/utility-services/toaster-message.service';

@Component({
	selector: 'app-cancel-pending-tour-request-modal',
	templateUrl: './cancel-pending-tour-request-modal.component.html',
	styleUrls: ['./cancel-pending-tour-request-modal.component.css']
})
export class CancelPendingTourRequestModalComponent implements OnInit {
	@Input() visitingRequestId: number;
	@Input() showCancelPendingTourRequestModal: boolean;
	@Output() showCancelPendingTourRequestModalChange = new EventEmitter<boolean>();
	@Output() onSuccessfulSave = new EventEmitter<void>();

	cancelReason: string | null = null;
	isCancelInProgress = false;

	private ngDestroyed = new Subject<void>();

	constructor(
		private toasterMessageService: ToasterMessageService,
		private visitingRequestService: VisitingRequestService
	) { }

	ngOnInit(): void {
	}

	onHideCancelPendingTourRequestModal() {
		this.cancelReason = null;
		this.showCancelPendingTourRequestModalChange.emit(false);
	}

	onSubmit() {
		this.isCancelInProgress = true;
		this.cancelVisitingRequest();
	}

	private cancelVisitingRequest() {
		this.isCancelInProgress = true;

		const cancelVisitingRequestDto = this.getCancelVisitingRequestDto();

		this.visitingRequestService.cancelVisitingRequest(cancelVisitingRequestDto)
			.pipe(takeUntil(this.ngDestroyed))
			.subscribe({
				next: (response) => {
					this.isCancelInProgress = false;
					this.afterSuccessfulSave();
				},
				error: () => {
					this.isCancelInProgress = false;
				}
			});
	}

	private getCancelVisitingRequestDto(): CancelVisitingRequestDto {
		return {
			visitingRequestId: this.visitingRequestId,
			cancelReason: this.cancelReason!
		};
	}

	private afterSuccessfulSave() {
		this.onSuccessfulSave.emit();
		this.toasterMessageService.success(MessageConstants.ApproveSuccessful);
		this.showCancelPendingTourRequestModal = false;
	}

	ngOnDestroy(): void {
		this.ngDestroyed.next();
		this.ngDestroyed.complete();
	}

}
