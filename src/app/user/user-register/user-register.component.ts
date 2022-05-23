import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
    registrationForm!: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
        this.registrationForm = new FormGroup({
            userName: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            confirmPassword: new FormControl(null, [Validators.required]),
            mobile: new FormControl(null, [Validators.required, Validators.maxLength(15)])
        }, this.passwordMatchingValidator);
    }

    passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
        return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null : {notmatched: true};
    }

    onSubmit() {
        console.log(this.registrationForm);
    }

}
