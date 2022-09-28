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

@Component({
    selector: 'app-add-property-dialog',
    templateUrl: './add-property-dialog.component.html',
    styleUrls: ['./add-property-dialog.component.css']
})


export class AddPropertyDialogComponent implements OnInit, OnDestroy {
    @Input() displayAddPropertyDialog: boolean = false;
    @Output() displayAddPropertyDialogEvent = new EventEmitter<boolean>();
    @ViewChild('fileUpload') fileUpload: FileUpload;
    @ViewChild('tabView') tabView: TabView;

    addPropertyForm!: FormGroup<IAddEditPropertyForm>;

    tabIndex: number;
    showLoader: boolean = false;

    sellRentOptions: Array<{ label: string, value: string }> = [
        {label: 'Sell', value: '1'},
        {label: 'Rent', value: '2'}
    ];

    propertyTypeOptions: IKeyValuePair[];
    furnishTypeOptions: IKeyValuePair[];
    cityList: Array<any> = [{label: 'Select City', value: "", disabled: true}];

    uploadedFiles: any[] = [];
    newFileUrls = [];

    constructor(private formBuilder: UntypedFormBuilder,
                private router: Router,
                private housingService: HousingService,
                private alertify: AlertifyService,
                private primeNGConfig: PrimeNGConfig) {
    }

    ngOnInit(): void {
        this.showLoader = true;
        this.primeNGConfig.ripple = true;
        this.CreateAddPropertyForm();

        this.tabIndex = 0;

        this.housingService.getPropertyTypes().subscribe(data => {
            this.showLoader = false;
            this.propertyTypeOptions = data;
        });

        this.housingService.getFurnishingTypes().subscribe(data => {
            this.furnishTypeOptions = data;
        });

        this.housingService.getAllCities().subscribe(data => {
            data.map(item => {
                this.cityList.push({label: item.name, value: item.id});
            });
            console.log(data);
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

    closeAddPropertyDialog() {
        this.displayAddPropertyDialog = false;
        this.fileUpload.clear();
        this.uploadedFiles = [];
        this.newFileUrls = [];
        this.displayAddPropertyDialogEvent.emit(this.displayAddPropertyDialog);
    }

    openPrevTab() {
        this.tabIndex = this.tabIndex - 1;
    }

    openNextTab() {
        this.tabIndex = this.tabIndex + 1;
    }

    onUpload(event: any) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

        console.log(this.fileUpload.files);
        // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
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
                }
            }
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

    get landmark() {
        return this.AddressPricing.controls['landmark'];
    }

    get price() {
        return this.AddressPricing.controls['price'];
    }

    get otherCost() {
        return this.AddressPricing.controls['otherCost'];
    }

    ngOnDestroy(): void {
        this.fileUpload.clear();
        this.uploadedFiles = [];
        this.newFileUrls = [];
    }
}
