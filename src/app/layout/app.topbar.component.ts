import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {AlertifyService} from "../services/alertify.service";

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

    constructor(public layoutService: LayoutService, private alertifyService: AlertifyService) { }

    loggedIn() {
        this.loggedInUser = localStorage.getItem('brh-userName')??'';
        return this.loggedInUser;
    }

    onLogout() {
        localStorage.removeItem('brh-token');
        localStorage.removeItem('brh-userName');
        this.alertifyService.success('You are logged out');
    }
}
