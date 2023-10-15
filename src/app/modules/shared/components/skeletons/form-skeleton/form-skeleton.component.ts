import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-skeleton',
  templateUrl: './form-skeleton.component.html',
  styleUrls: ['./form-skeleton.component.css']
})
export class FormSkeletonComponent implements OnInit {

	@Input() row: number = 1;
	dummyArray: null[] = [];

  constructor() { }

  ngOnInit(): void {
		this.dummyArray = Array.from({length: this.row});
  }

}
