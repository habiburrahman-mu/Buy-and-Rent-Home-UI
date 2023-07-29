import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-login-register-unauthorized-modal',
    templateUrl: './login-register-unauthorized-modal.component.html',
    styleUrls: ['./login-register-unauthorized-modal.component.css']
})
export class LoginRegisterUnauthorizedModalComponent implements OnInit {

    @Input() isLoginRegisterModalVisible = false;
    @Output() isLoginRegisterModalVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit(): void {
    }

    onHideLoginRegisterModal() {
        this.isLoginRegisterModalVisible = false;
        this.isLoginRegisterModalVisibleChange.emit(false);
    }

}
