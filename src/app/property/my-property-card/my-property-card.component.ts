import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-my-property-card',
    templateUrl: './my-property-card.component.html',
    styleUrls: ['./my-property-card.component.css']
})
export class MyPropertyCardComponent implements OnInit {
    @Output() closePropertyEditDialogEvent = new EventEmitter<boolean>();
    actionItems: MenuItem[];

    constructor() {
    }

    ngOnInit(): void {
        this.actionItems = [
            {
                icon: 'fas fa-edit',
                command: () => {
                    this.closePropertyEditDialogEvent.emit(true);
                },
                styleClass: "p-button-rounded p-button-success p-button-raised",
            },
            {
                icon: 'fas fa-trash',
                command: () => {

                },
                styleClass: "p-button-rounded p-button-danger p-button-raised",
            }
        ]
    }


    openPropertyEditDialog() {
        this.closePropertyEditDialogEvent.emit(true);
    }
}
