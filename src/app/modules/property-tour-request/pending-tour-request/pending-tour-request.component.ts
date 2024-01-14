import { Component, OnInit } from '@angular/core';
import VisitingRequestWithPropertyDetailDto from 'src/app/models/visitingRequestWithPropertyDetailDto';
import { VisitingRequestService } from 'src/app/services/http/visiting-request.service';

@Component({
  selector: 'app-pending-tour-request',
  templateUrl: './pending-tour-request.component.html',
  styleUrls: ['./pending-tour-request.component.css']
})
export class PendingTourRequestComponent implements OnInit {

	visitingRequestWithPropertyDetailList: VisitingRequestWithPropertyDetailDto[] = [];

  constructor(
		private visitingRequestService: VisitingRequestService
	) { }

  ngOnInit(): void {
		this.visitingRequestService.getVisitingRequestListForMyProperties('P')
			.subscribe({
				next: response => {
					this.visitingRequestWithPropertyDetailList = response;
				},
				error: err => {

				}
			});
  }

}
