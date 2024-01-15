import { Component, Input, OnInit } from '@angular/core';
import VisitingRequestWithPropertyDetailDto from 'src/app/models/visitingRequestWithPropertyDetailDto';

@Component({
  selector: 'app-pending-tour-request-card',
  templateUrl: './pending-tour-request-card.component.html',
  styleUrls: ['./pending-tour-request-card.component.css']
})
export class PendingTourRequestCardComponent implements OnInit {

	@Input() visitingRequestWithPropertyDetail: VisitingRequestWithPropertyDetailDto;

  constructor() { }

  ngOnInit(): void {
  }

}
