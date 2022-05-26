import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AlertifyService} from "../../services/alertify.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

    constructor(private authService: AuthService,
                private alertifyService: AlertifyService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    onLogin(loginForm: NgForm) {
        const token = this.authService.authUser(loginForm.value);
        if(token) {
            localStorage.setItem('brh-token', token.userName);
            this.alertifyService.success("Login Successful");
            this.router.navigate(['/'])

        } else {
            this.alertifyService.error("Login failed");

        }
    }
}
