import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AlertifyService} from "../../services/alertify.service";
import {Router} from "@angular/router";
import {UserForLogin} from "../../model/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

    isLoading: boolean = false;

    constructor(private authService: AuthService,
                private alertifyService: AlertifyService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    onLogin(loginForm: NgForm) {
        this.isLoading = true;
        this.authService.authUser(loginForm.value).subscribe({
            next: (response: UserForLogin) => {
                console.log(response);
                localStorage.setItem('brh-token', response.token);
                localStorage.setItem('brh-userName', response.userName);
                this.isLoading = false
                this.alertifyService.success('Login Successful');
                this.router.navigate(['/']);
            },
            error: (error: HttpErrorResponse) => {
                this.isLoading = false;
                console.log(error);
            }
        });
        // if(token) {
        //     localStorage.setItem('brh-token', token.userName);
        //     this.alertifyService.success("Login Successful");
        //     this.router.navigate(['/'])
        //
        // } else {
        //     this.alertifyService.error("Login failed");
        //
        // }
    }
}
