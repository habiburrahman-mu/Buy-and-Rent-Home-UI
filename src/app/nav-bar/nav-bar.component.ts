import {Component, OnInit} from '@angular/core';
import {AlertifyService} from "../services/alertify.service";

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    loggedInUser!: string;

    constructor(private alertifyService: AlertifyService) {
    }

    ngOnInit(): void {
    }

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
