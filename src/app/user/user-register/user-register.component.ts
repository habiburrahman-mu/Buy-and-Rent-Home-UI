import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserForRegister} from "../../model/user";
import {AlertifyService} from "../../services/alertify.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
    registrationForm!: FormGroup;
    user!: UserForRegister;
    isUserSubmitted: boolean = false;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private alertifyService: AlertifyService) {
    }

    ngOnInit(): void {
        this.createRegistrationForm();
    }

    createRegistrationForm() {
        this.registrationForm = this.fb.group({
            userName: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]],
            confirmPassword: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.maxLength(15)]]
        }, {validators: this.passwordMatchingValidator});
    }

    onSubmit() {
        this.isUserSubmitted = true;
        if (this.registrationForm.valid) {
            this.authService.registerUser(this.userData()).subscribe(
                () => {
                    this.registrationForm.reset();
                    this.isUserSubmitted = false;
                    this.alertifyService.success("You are successfully registered");
                }, error => {
                    console.log(error);
                    this.alertifyService.error(error.error);
                }
            );
        } else {
            this.alertifyService.error('Kindly provide the required fields');
        }
    }

    onReset() {
        this.registrationForm.reset();
        this.isUserSubmitted = false;
    }

    userData(): UserForRegister {
        return this.user = {
            userName: this.userName.value,
            email: this.email.value,
            password: this.password.value,
            mobile: this.mobile.value
        }
    }

    get userName(): FormControl {
        return this.registrationForm.get('userName') as FormControl;
    }

    get email(): FormControl {
        return this.registrationForm.get('email') as FormControl;
    }

    get password(): FormControl {
        return this.registrationForm.get('password') as FormControl;
    }

    get confirmPassword(): FormControl {
        return this.registrationForm.get('confirmPassword') as FormControl;
    }

    get mobile(): FormControl {
        return this.registrationForm.get('mobile') as FormControl;
    }

    passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
        return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : {notmatched: true};
    }

}
