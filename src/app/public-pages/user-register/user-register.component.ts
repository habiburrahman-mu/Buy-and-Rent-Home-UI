import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from "@angular/forms";
import { UserForRegister } from "../../models/user";
import { AuthService } from "../../services/auth.service";
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

	registrationForm = this.fb.group({
		name: this.fb.control<string | null>(null, [Validators.required]),
		username: this.fb.control<string | null>(null, [Validators.required]),
		email: this.fb.control<string | null>(null, [Validators.required, Validators.email]),
		password: this.fb.control<string | null>(null, [Validators.required, Validators.minLength(8)]),
		confirmPassword: this.fb.control<string | null>(null, [Validators.required]),
		mobile: this.fb.control<string | null>(null, [Validators.required]),
	}, { validators: this.passwordMatchingValidator });

	isUserSubmitted: boolean = false;
	isRegistrationInProgress = false;;

	constructor(private fb: FormBuilder,
		private authService: AuthService,
		private messageService: MessageService,
		private router: Router) {
	}

	ngOnInit(): void {
	}

	onSubmit() {
		this.isUserSubmitted = true;
		if (this.registrationForm.valid) {
			this.isRegistrationInProgress = true;
			this.authService.registerUser(this.userDataForRegisterFromForm).subscribe(
				{
					next: () => {
						this.isRegistrationInProgress = false;
						this.onReset();
						this.messageService.add({
							severity: 'success',
							summary: 'Registration',
							detail: 'You are successfully registered'
						});
						this.router.navigate(['login']);
					},
					error: _ => {
						this.isRegistrationInProgress = false;
					}
				}
			);
		} else {
			this.messageService.add({
				severity: 'warning',
				summary: 'Registration',
				detail: 'Kindly provide the required fields'
			});
		}
	}

	onReset() {
		this.registrationForm.reset();
		this.isUserSubmitted = false;
	}

	get userDataForRegisterFromForm(): UserForRegister {
		var userForRegister: UserForRegister = {
			name: this.registrationForm.controls.name.value!,
			userName: this.registrationForm.controls.username.value!,
			email: this.registrationForm.controls.email.value!,
			password: this.registrationForm.controls.password.value!,
			mobile: this.registrationForm.controls.mobile.value!
		}

		return userForRegister;
	}

	passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
		return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : { notmatched: true };
	}

}
