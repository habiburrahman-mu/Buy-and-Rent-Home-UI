import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
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
            SellRent: [null, Validators.required],
            PType: [null, Validators.required],
            Name: [null, Validators.required],
            Price: [null, Validators.required],
            BuiltArea: [null, Validators.required],
        })
    }

    onBack() {
        this.router.navigate(['/']);
    }

    onSubmit() {
        console.log(this.addPropertyForm);
    }

    selectTab(tabId: number) {
        this.formTabs!.tabs[tabId].active = true;
    }

}
