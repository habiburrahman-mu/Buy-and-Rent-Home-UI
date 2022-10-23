import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-my-property-card',
    templateUrl: './my-property-card.component.html',
    styleUrls: ['./my-property-card.component.css']
})
export class MyPropertyCardComponent implements OnInit {
    @Output() openPropertyEditDialogEvent = new EventEmitter<boolean>();
    actionItems: MenuItem[];

    constructor() {
    }

    ngOnInit(): void {
    }


    openPropertyEditDialog() {
        this.openPropertyEditDialogEvent.emit(true);
    }
}
