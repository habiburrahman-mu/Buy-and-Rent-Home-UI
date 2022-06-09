import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {TabsetComponent} from "ngx-bootstrap/tabs";
import {IPropertyBase} from "../../model/IPropertyBase";

@Component({
    selector: 'app-add-property',
    templateUrl: './add-property.component.html',
    styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
    // @ViewChild('Form') addPropertyForm!: NgForm;
    @ViewChild('formTabs') formTabs?: TabsetComponent;

    addPropertyForm!: FormGroup;
    nextClicked: boolean = false;

    // will come from api
    propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
    furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

    propertyView: IPropertyBase = {

        Id: 0,
        Name: "",
        Price: null,
        SellRent: 0,
        PType: "",
        BHK: 0,
        BuiltArea: null,
        City: "",
        FType: "",
        RTM: null,

    };

    constructor(private fBuilder: FormBuilder,private router: Router) {
    }

    ngOnInit(): void {
        this.createAddPropertyForm();
    }

    createAddPropertyForm() {
        this.addPropertyForm = this.fBuilder.group({
            BasicInfo: this.fBuilder.group({
                SellRent: ['1', Validators.required],
                PType: [null, Validators.required],
                FType: [null, Validators.required],
                Name: [null, Validators.required],
                City: [null, Validators.required],
            }),
            PriceInfo: this.fBuilder.group({
                Price: [null, Validators.required],
                BuiltArea: [null, Validators.required],
            })
        })
    }

    // getter methods

    get BasicInfo() {
        return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
    }

    get PriceInfo() {
        return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
    }

    get SellRent() {
        return this.BasicInfo.controls['SellRent'] as FormControl;
    }

    get Price() {
        return this.PriceInfo.controls['Price'] as FormControl;
    }

    onBack() {
        this.router.navigate(['/']);
    }

    onSubmit() {
        this.nextClicked = true;
        if(this.BasicInfo.invalid) {
            this.formTabs!.tabs[0].active = true;
            return;
        }
        if(this.PriceInfo.invalid) {
            this.formTabs!.tabs[1].active = true;
            return;
        }
        console.log(this.addPropertyForm);
    }

    selectTab(nextTabId: number, isCurrentTabValid: boolean) {
        this.nextClicked = true;
        if(isCurrentTabValid) {
            this.formTabs!.tabs[nextTabId].active = true;
        }

    }

}
