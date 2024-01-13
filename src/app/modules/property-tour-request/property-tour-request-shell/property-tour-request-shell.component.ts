import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-property-tour-request-shell',
	templateUrl: './property-tour-request-shell.component.html',
	styleUrls: ['./property-tour-request-shell.component.css']
})
export class PropertyTourRequestShellComponent implements OnInit {

	tabViewActiveIndex: number = 1;

	constructor() { }

	ngOnInit(): void {
	}

}
