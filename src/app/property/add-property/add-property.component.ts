import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormControl} from '@angular/forms';
import {TabsetComponent} from 'ngx-bootstrap/tabs/public_api';
import {HousingService} from 'src/app/services/housing.service';
import {AlertifyService} from 'src/app/services/alertify.service';
import {IPropertyBase} from "../../model/IPropertyBase";
import {Property} from "../../model/Property";
import {PrimeNGConfig} from "primeng/api";
import {IKeyValuePair} from "../../model/ikeyvaluepair";


@Component({
    selector: 'app-add-property',
    templateUrl: './add-property.component.html',
    styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
    // @ViewChild('Form') addPropertyForm: NgForm;
    @ViewChild('formTabs') formTabs!: TabsetComponent;
    addPropertyForm!: UntypedFormGroup;
    nextClicked!: boolean;
    property = new Property();
    cityList: Array<any> = [{label: 'Select City', value: "", disabled: true}];

    sellRentOptions: Array<{label: string, value: string}> = [
        {label: 'Sell', value: '1'},
        {label: 'Rent', value: '2'}
    ];

    bhkOptions: Array<{label: string, value: string}> = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'}
    ];

    // propertyTypeOptions: Array<{label: string, value: string}> = [
    //     {label: 'House', value: 'House'},
    //     {label: 'Apartment', value: 'Apartment'},
    //     {label: 'Duplex', value: 'Duplex'}
    // ];

    propertyTypeOptions: IKeyValuePair[];

    // furnishTypeOptions: Array<{label: string, value: string}> = [
    //     {label: 'Fully', value: 'Fully'},
    //     {label: 'Semi', value: 'Semi'},
    //     {label: 'Unfurnished', value: 'Unfurnished'}
    // ];

    furnishTypeOptions: IKeyValuePair[];

    // Will come from masters
    propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
    furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

    propertyView: IPropertyBase = {
        id: 0,
        name: '',
        price: null,
        sellRent: 0,
        propertyType: "",
        furnishingType: "",
        bhk: 0,
        builtArea: null,
        city: "",
        readyToMove: null
    };

    constructor(
        private fb: UntypedFormBuilder,
        private router: Router,
        private housingService: HousingService,
        private alertify: AlertifyService,
        private primeNGConfig: PrimeNGConfig) {
    }

    ngOnInit() {
        this.primeNGConfig.ripple = true;
        this.CreateAddPropertyForm();
        this.housingService.getAllCities().subscribe(data => {
            data.map(item => {
                this.cityList.push({label: item.name, value: item.id});
            });
            console.log(data);
        });

        this.housingService.getPropertyTypes().subscribe(data => {
            this.propertyTypeOptions = data;
        });

        this.housingService.getFurnishingTypes().subscribe(data => {
            this.furnishTypeOptions = data;
        });
    }

    CreateAddPropertyForm() {
        this.addPropertyForm = this.fb.group({
            BasicInfo: this.fb.group({
                SellRent: ['1', Validators.required],
                BHK: [null, Validators.required],
                PType: [null, Validators.required],
                FType: [null, Validators.required],
                Name: [null, Validators.required],
                City: [null, Validators.required]
            }),

            PriceInfo: this.fb.group({
                Price: [null, Validators.required],
                BuiltArea: [null, Validators.required],
                CarpetArea: [null],
                Security: [null],
                Maintenance: [null],
            }),

            AddressInfo: this.fb.group({
                FloorNo: [null],
                TotalFloor: [null],
                Address: [null, Validators.required],
                LandMark: [null],
            }),

            OtherInfo: this.fb.group({
                RTM: [null, Validators.required],
                PossessionOn: [null],
                AOP: [null],
                Gated: [null],
                MainEntrance: [null],
                Description: [null]
            })
        });
    }

//#region <Getter Methods>
    // #region <FormGroups>
    get BasicInfo() {
        return this.addPropertyForm.controls['BasicInfo'] as UntypedFormGroup;
    }

    get PriceInfo() {
        return this.addPropertyForm.controls['PriceInfo'] as UntypedFormGroup;
    }

    get AddressInfo() {
        return this.addPropertyForm.controls['AddressInfo'] as UntypedFormGroup;
    }

    get OtherInfo() {
        return this.addPropertyForm.controls['OtherInfo'] as UntypedFormGroup;
    }

    // #endregion

    //#region <Form Controls>
    get SellRent() {
        return this.BasicInfo.controls['SellRent'] as UntypedFormControl;
    }

    get BHK() {
        return this.BasicInfo.controls['BHK'] as UntypedFormControl;
    }

    get PType() {
        return this.BasicInfo.controls['PType'] as UntypedFormControl;
    }

    get FType() {
        return this.BasicInfo.controls['FType'] as UntypedFormControl;
    }

    get Name() {
        return this.BasicInfo.controls['Name'] as UntypedFormControl;
    }

    get City() {
        return this.BasicInfo.controls['City'] as UntypedFormControl;
    }

    get Price() {
        return this.PriceInfo.controls['Price'] as UntypedFormControl;
    }

    get BuiltArea() {
        return this.PriceInfo.controls['BuiltArea'] as UntypedFormControl;
    }

    get CarpetArea() {
        return this.PriceInfo.controls['CarpetArea'] as UntypedFormControl;
    }

    get Security() {
        return this.PriceInfo.controls['Security'] as UntypedFormControl;
    }

    get Maintenance() {
        return this.PriceInfo.controls['Maintenance'] as UntypedFormControl;
    }

    get FloorNo() {
        return this.AddressInfo.controls['FloorNo'] as UntypedFormControl;
    }

    get TotalFloor() {
        return this.AddressInfo.controls['TotalFloor'] as UntypedFormControl;
    }

    get Address() {
        return this.AddressInfo.controls['Address'] as UntypedFormControl;
    }

    get LandMark() {
        return this.AddressInfo.controls['LandMark'] as UntypedFormControl;
    }

    get RTM() {
        return this.OtherInfo.controls['RTM'] as UntypedFormControl;
    }

    get PossessionOn() {
        return this.OtherInfo.controls['PossessionOn'] as UntypedFormControl;
    }

    get AOP() {
        return this.OtherInfo.controls['AOP'] as UntypedFormControl;
    }

    get Gated() {
        return this.OtherInfo.controls['Gated'] as UntypedFormControl;
    }

    get MainEntrance() {
        return this.OtherInfo.controls['MainEntrance'] as UntypedFormControl;
    }

    get Description() {
        return this.OtherInfo.controls['Description'] as UntypedFormControl;
    }

    //#endregion
//#endregion

    onBack() {
        this.router.navigate(['/']);
    }

    onSubmit() {
        this.nextClicked = true;
        if (this.allTabsValid()) {
            this.mapProperty();
            this.housingService.addProperty(this.property);
            this.alertify.success('Congrats, your property listed successfully on our website');

            if (this.SellRent.value === '2') {
                this.router.navigate(['/rent-property']);
            } else {
                this.router.navigate(['/']);
            }


        } else {
            this.alertify.error('Please review the form and provide all valid entries');
        }
    }

    mapProperty(): void {
        this.property.id = this.housingService.newPropID();
        this.property.sellRent = +this.SellRent.value;
        this.property.bhk = this.BHK.value;
        this.property.propertyType = this.PType.value;
        this.property.name = this.Name.value;
        this.property.city = this.City.value;
        this.property.furnishingType = this.FType.value;
        this.property.price = this.Price.value;
        this.property.security = this.Security.value;
        this.property.maintenance = this.Maintenance.value;
        this.property.builtArea = this.BuiltArea.value;
        this.property.carpetArea = this.CarpetArea.value;
        this.property.floorNo = this.FloorNo.value;
        this.property.totalFloors = this.TotalFloor.value;
        this.property.address = this.Address.value;
        this.property.address2 = this.LandMark.value;
        this.property.readyToMove = this.RTM.value;
        this.property.age = this.AOP.value;
        this.property.gated = this.Gated.value;
        this.property.mainEntrance = this.MainEntrance.value;
        this.property.estPossessionOn = this.PossessionOn.value;
        this.property.description = this.Description.value;
        // this.property.PostedOn = new Date().toString();
    }

    allTabsValid(): boolean {
        if (this.BasicInfo.invalid) {
            this.formTabs.tabs[0].active = true;
            return false;
        }

        if (this.PriceInfo.invalid) {
            this.formTabs.tabs[1].active = true;
            return false;
        }

        if (this.AddressInfo.invalid) {
            this.formTabs.tabs[2].active = true;
            return false;
        }

        if (this.OtherInfo.invalid) {
            this.formTabs.tabs[3].active = true;
            return false;
        }
        return true;
    }

    selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
        this.nextClicked = true;
        if (IsCurrentTabValid) {
            this.formTabs.tabs[NextTabId].active = true;
        }
    }

}
