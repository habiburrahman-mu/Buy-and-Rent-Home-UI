import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {TabsetComponent} from "ngx-bootstrap/tabs";
import {IProperty} from "../IProperty.interface";

@Component({
    selector: 'app-add-property',
    templateUrl: './add-property.component.html',
    styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
    @ViewChild('Form') addPropertyForm!: NgForm;
    @ViewChild('formTabs') formTabs?: TabsetComponent;

    // will come from api
    propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
    furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

    propertyView: IProperty = {
        Id: 0,
        Name: "",
        Price: null,
        SellRent: 0,
        Type: ""

    };

    constructor(private router: Router) {
    }

    ngOnInit(): void {
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
