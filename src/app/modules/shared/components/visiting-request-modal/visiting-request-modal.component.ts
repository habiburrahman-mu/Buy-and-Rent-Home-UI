import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-visiting-request-modal',
    templateUrl: './visiting-request-modal.component.html',
    styleUrls: ['./visiting-request-modal.component.css']
})
export class VisitingRequestModalComponent implements OnInit {

    @Input() isVisitingRequestModalVisible = false;
    @Output() isVisitingRequestModalVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void {
    }

    onHideVisitingRequestModalModal() {
        this.isVisitingRequestModalVisible = false;
        this.isVisitingRequestModalVisibleChange.emit(false);
    }
}
