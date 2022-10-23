import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {
    FormGroup,
    UntypedFormBuilder,
    Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {HousingService} from "../../services/housing.service";
import {AlertifyService} from "../../services/alertify.service";
import {PrimeNGConfig} from "primeng/api";
import {IKeyValuePair} from "../../model/ikeyvaluepair";
import {FileUpload} from "primeng/fileupload";
import {TabView} from "primeng/tabview";
import {IAddEditPropertyForm} from "../../model/IAddEditPropertyForm";
import {Property} from "../../model/Property";
import {CityService} from "../../services/city.service";
import {CountryService} from "../../services/country.service";
import {FurnishingTypeService} from "../../services/furnishing-type.service";
import {PropertyTypeService} from "../../services/property-type.service";
import {PropertyService} from "../../services/property.service";

@Component({
    selector: 'app-add-property-dialog',
    templateUrl: './add-property-dialog.component.html',
    styleUrls: ['./add-property-dialog.component.css']
})


export class AddPropertyDialogComponent implements OnInit, OnDestroy {
    @ViewChild('fileUpload') fileUpload: FileUpload;
    @ViewChild('tabView') tabView: TabView;

    addPropertyForm!: FormGroup<IAddEditPropertyForm>;
    property = new Property();

    numOfTabs = 4;
    tabIndex: number;
    showLoader: boolean = false;

    sellRentOptions: Array<{ label: string, value: string }> = [
        {label: 'Sell', value: '1'},
        {label: 'Rent', value: '2'}
    ];

    propertyTypeOptions: IKeyValuePair[];
    furnishTypeOptions: IKeyValuePair[];
    cityList: Array<any> = [{label: 'Select City', value: "", disabled: true}];
    countryList: Array<any> = [{label: 'Select Country', value: "", disabled: true}];

    uploadedFiles: any[] = [];
    newFileUrls = [];

    constructor(private formBuilder: UntypedFormBuilder,
                private router: Router,
                private housingService: HousingService,
                private alertify: AlertifyService,
                private primeNGConfig: PrimeNGConfig,
                private cityService: CityService,
                private countryService: CountryService,
                private furnishingTypeService: FurnishingTypeService,
                private propertyTypeService: PropertyTypeService,
                private propertyService: PropertyService,) {
    }

    ngOnInit(): void {
        this.showLoader = true;
        this.primeNGConfig.ripple = true;
        this.CreateAddPropertyForm();

        this.tabIndex = 0;

        this.propertyTypeService.getPropertyTypes().subscribe(data => {
            this.showLoader = false;
            this.propertyTypeOptions = data;
        });

        this.furnishingTypeService.getFurnishingTypes().subscribe(data => {
            this.furnishTypeOptions = data;
        });

        this.countryService.getAllCountries().subscribe(data => {
            data.map(item => {
                this.countryList.push({label: item.name, value: item.id});
            });
        });
    }

    CreateAddPropertyForm() {
        this.addPropertyForm = this.formBuilder.group({
            basicInfo: this.formBuilder.group({
                propertyName: [null, {validators: [Validators.required]}],
                sellRent: [null, {validators: [Validators.required]}],
                propertyType: [null, {validators: [Validators.required]}],
                furnishType: [null, {validators: [Validators.required]}],
                bedroom: [null, {validators: [Validators.required]}],
                bathroom: [null],
                commonSpace: [null],
            }),
            addressPricing: this.formBuilder.group({
                country: [null, Validators.required],
                city: [null, Validators.required],
                streetAddress: [null, Validators.required],
                totalFloor: [null, Validators.required],
                floor: [null, Validators.required],
                landmark: [null],
                area: [null, Validators.required],
                price: [null, Validators.required],
                otherCost: [null],
            }),
            others: this.formBuilder.group({
                gym: [false],
                parking: [false],
                swimmingPool: [false],
                description: [null],
            })
        })
    }

    // closeAddPropertyDialog() {
    //     this.fileUpload.clear();
    //     this.uploadedFiles = [];
    //     this.newFileUrls = [];
    // }

    openPrevTab() {
        this.tabIndex = this.tabIndex - 1;
    }

    openNextTab() {
        this.tabIndex = this.tabIndex + 1;
    }

    onChangeCountry() {
        console.log(this.country.value);
        this.cityList = [{label: 'Select City', value: "", disabled: true}];
        this.city.setValue(null);
        if (this.country.value) {
            this.createCityList(this.country.value);
        }
    }

    createCityList(countryId: number) {
        this.showLoader = true;
        this.cityService.getAllCityByCountry(countryId).subscribe(data => {
            data.map(item => {
                this.cityList.push({label: item.name, value: item.id});
            });
            this.showLoader = false;
        });
        // this.cityService.getAllCities().subscribe(data => {
        //     data.map(item => {
        //         this.cityList.push({label: item.name, value: item.id});
        //     });
        // });
    }

    onUpload(event: any) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        console.log(this.fileUpload.files);
        // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }

    deleteFileFromNewFileUrlList(i: number) {
        this.newFileUrls.splice(i, 1);
    }

    onSubmit() {
        console.log(this.addPropertyForm);
        this.mapProperty();
        console.log(this.property);
    }


    handleFileChange() {
        console.log(this.fileUpload.files);
        if (this.fileUpload.files.length > 0) {
            for (let i = 0; i < this.fileUpload.files.length; i++) {
                console.log(this.fileUpload.files[i]);
                let reader = new FileReader();
                reader.readAsDataURL(this.fileUpload.files[i]);
                reader.onload = (events: any) => {
                    // @ts-ignore
                    this.newFileUrls.push(events.target.result);
                    console.log(events.target);
                }
            }

            this.fileUpload.clear();
        }
    }

    get BasicInfo() {
        return this.addPropertyForm.controls['basicInfo'];
    }

    get propertyName() {
        return this.BasicInfo.controls['propertyName'];
    }

    get sellRent() {
        return this.BasicInfo.controls['sellRent'];
    }

    get propertyType() {
        return this.BasicInfo.controls['propertyType'];
    }

    get furnishType() {
        return this.BasicInfo.controls['furnishType'];
    }

    get bedroom() {
        return this.BasicInfo.controls['bedroom'];
    }

    get bathroom() {
        return this.BasicInfo.controls['bathroom'];
    }

    get commonSpace() {
        return this.BasicInfo.controls['commonSpace'];
    }

    get AddressPricing() {
        return this.addPropertyForm.controls['addressPricing'];
    }

    get country() {
        return this.AddressPricing.controls['country'];
    }

    get city() {
        return this.AddressPricing.controls['city'];
    }

    get streetAddress() {
        return this.AddressPricing.controls['streetAddress'];
    }

    get totalFloor() {
        return this.AddressPricing.controls['totalFloor'];
    }

    get floor() {
        return this.AddressPricing.controls['floor'];
    }

    get area() {
        return this.AddressPricing.controls['area'];
    }

    get rentPrice() {
        return this.AddressPricing.controls['price'];
    }

    get landmark() {
        return this.AddressPricing.controls['landmark'];
    }

    get price() {
        return this.AddressPricing.controls['price'];
    }

    get otherCost() {
        return this.AddressPricing.controls['otherCost'];
    }

    get Others() {
        return this.addPropertyForm.controls['others'];
    }

    get gym() {
        return this.Others.controls['gym'];
    }

    get parking() {
        return this.Others.controls['parking'];
    }

    get swimmingPool() {
        return this.Others.controls['swimmingPool'];
    }

    get description() {
        return this.Others.controls['description'];
    }

    mapProperty() {
        this.property.sellRent = this.sellRent.value!;
        this.property.name = this.propertyName.value!;
        this.property.propertyTypeId = this.propertyType.value!;
        this.property.bedroom = this.bedroom.value!;
        this.property.bathroom = this.bathroom.value;
        this.property.commonSpace = this.commonSpace.value;

        this.property.countryId = this.country.value!;
        this.property.cityId = this.city.value!;
        this.property.streetAddress = this.streetAddress.value!;
        this.property.totalFloor = this.totalFloor.value!;
        this.property.floor = this.floor.value!;
        this.property.landmark = this.landmark.value!;
        this.property.area = this.area.value!;
        this.property.rentPrice = this.rentPrice.value!;
        this.property.otherCost = this.otherCost.value!;

        this.property.gym = this.gym.value;
        this.property.parking = this.parking.value;
        this.property.swimmingPool = this.swimmingPool.value;
        this.property.description = this.description.value!;
    }

    ngOnDestroy(): void {
        this.fileUpload.clear();
        this.uploadedFiles = [];
        this.newFileUrls = [];
    }
}
