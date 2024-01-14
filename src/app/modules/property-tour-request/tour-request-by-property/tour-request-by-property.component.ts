import { Component, OnInit } from '@angular/core';
import VisitingRequestWithPropertyDetailDto from 'src/app/models/visitingRequestWithPropertyDetailDto';
import { VisitingRequestService } from 'src/app/services/http/visiting-request.service';

@Component({
  selector: 'app-tour-request-by-property',
  templateUrl: './tour-request-by-property.component.html',
  styleUrls: ['./tour-request-by-property.component.css']
})
export class TourRequestByPropertyComponent implements OnInit {



  constructor(

	) { }

  ngOnInit(): void {

  }

}
