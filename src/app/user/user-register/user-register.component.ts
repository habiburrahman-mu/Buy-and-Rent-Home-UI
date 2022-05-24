import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
    registrationForm!: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
        // this.registrationForm = new FormGroup({
        //     userName: new FormControl(null, Validators.required),
        //     email: new FormControl(null, [Validators.required, Validators.email]),
        //     password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        //     confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        //     mobile: new FormControl(null, [Validators.required, Validators.maxLength(15)])
        // }, this.passwordMatchingValidator);
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

    onSubmit() {
        console.log(this.registrationForm);
    }

}
