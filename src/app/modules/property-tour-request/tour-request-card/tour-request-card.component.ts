import { Component, Input, OnInit } from '@angular/core';
import VisitingRequestConstants from 'src/app/constants/visiting-request-constants';
import VisitingRequestWithPropertyDetailDto from 'src/app/models/visitingRequestWithPropertyDetailDto';

@Component({
  selector: 'app-tour-request-card',
  templateUrl: './tour-request-card.component.html',
  styleUrls: ['./tour-request-card.component.css']
})
export class PendingTourRequestCardComponent implements OnInit {

	@Input() visitingRequestWithPropertyDetail: VisitingRequestWithPropertyDetailDto;
	@Input() displayApprovalButtons: boolean;

	readonly visitingRequestStatusList = VisitingRequestConstants.StatusList;

  constructor() { }

  ngOnInit(): void {
  }

}
