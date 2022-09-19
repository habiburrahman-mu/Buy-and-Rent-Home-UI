import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-my-property-list',
    templateUrl: './my-property-list.component.html',
    styleUrls: ['./my-property-list.component.css']
})
export class MyPropertyListComponent implements OnInit {

    showPropertyEditDialog: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    openPropertyEditDialog() {
        this.showPropertyEditDialog = true;
    }

}
