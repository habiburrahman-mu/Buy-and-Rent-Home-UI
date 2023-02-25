import {Component, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    loggedInUser!: string;

    constructor(private messageService: MessageService) {
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
        this.messageService.add({
            severity: 'success',
            summary: 'Logged Out',
            detail: 'Successfully Logged Out'
        });
    }
}
