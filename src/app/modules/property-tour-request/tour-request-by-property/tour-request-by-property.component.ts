import { Component, OnInit } from '@angular/core';
import VisitingRequestWithPropertyDetailDto from 'src/app/models/visitingRequestWithPropertyDetailDto';
import { VisitingRequestService } from 'src/app/services/http/visiting-request.service';

@Component({
  selector: 'app-tour-request-by-property',
  templateUrl: './tour-request-by-property.component.html',
  styleUrls: ['./tour-request-by-property.component.css']
})
export class TourRequestByPropertyComponent implements OnInit {

	responsiveOptions = [
		{
				breakpoint: '1600px',
				numVisible: 3,
				numScroll: 1
		},
		{
			breakpoint: '1400px',
			numVisible: 3,
			numScroll: 1
	},
		// {
		// 		breakpoint: '1220px',
		// 		numVisible: 1,
		// 		numScroll: 1
		// },
		{
				breakpoint: '600px',
				numVisible: 1,
				numScroll: 1
		}
];

  constructor(

	) { }

  ngOnInit(): void {

  }

}
