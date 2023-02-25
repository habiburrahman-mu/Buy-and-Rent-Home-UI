import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from "../services/auth.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    loggedInUser!: string;

    constructor(public layoutService: LayoutService,
        private authService: AuthService,
        private messageService: MessageService) { }

    loggedIn() {
        this.loggedInUser = localStorage.getItem('brh-userName') ?? '';
        return this.loggedInUser;
    }

    get isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    onLogout() {
        this.authService.logOut();
        this.messageService.add({
            severity: 'success',
            summary: 'Logged Out',
            detail: 'Successfully Logged Out'
        });
    }
}
