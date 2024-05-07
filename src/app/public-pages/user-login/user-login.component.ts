import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { MessageService } from 'primeng/api';
import LoginResponseDto from 'src/app/models/loginResponseDto';

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

	isLoading: boolean = false;

	constructor(private authService: AuthService,
		private messageService: MessageService,
		private router: Router) {
	}

	ngOnInit(): void {
	}

	onLogin(loginForm: NgForm) {
		this.isLoading = true;
		this.authService.authUser(loginForm.value).subscribe({
			next: response => {
				console.log(response);
				this.saveUserDataInLocalStorage(response);
				this.isLoading = false;
				this.messageService.add({
					severity: 'success',
					summary: 'Login',
					detail: 'Login Successful'
				});
				this.router.navigate(['/']);
			},
			error: (error: HttpErrorResponse) => {
				this.isLoading = false;
			}
		});
	}

	private saveUserDataInLocalStorage(response: LoginResponseDto) {
		localStorage.setItem('brh-token', response.token);
		localStorage.setItem('brh-userName', response.userName);
		localStorage.setItem('brh-userFullName', response.name);
	}
}
