import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HousingService} from "../../services/housing.service";
import {AlertifyService} from "../../services/alertify.service";
import {PrimeNGConfig} from "primeng/api";
import {IKeyValuePair} from "../../model/ikeyvaluepair";
import {FileUpload} from "primeng/fileupload";
import {TabView} from "primeng/tabview";

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

    addPropertyForm!: UntypedFormGroup;

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
                propertyName: [null, Validators.required],
                sellRent: [null, Validators.required],
                propertyType: [null, Validators.required],
                furnishType: [null, Validators.required],
                bedroom: [null],
                bathroom: [null],
                commonSpace: [null]
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
        });
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
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        console.log(this.fileUpload.files);

        debugger;
        // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }


    handleFileChange() {
        console.log(this.fileUpload.files);
        if(this.fileUpload.files.length > 0) {
            for(let i = 0; i < this.fileUpload.files.length; i++) {
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

    get BasicInfo(): UntypedFormGroup {
        return this.addPropertyForm.controls['basicInfo'] as UntypedFormGroup;
    }

    get propertyName(): UntypedFormControl {
        return this.BasicInfo.controls['propertyName'] as UntypedFormControl;
    }
    get sellRent(): UntypedFormControl {
        return this.BasicInfo.controls['sellRent'] as UntypedFormControl;
    }
    get propertyType(): UntypedFormControl {
        return this.BasicInfo.controls['propertyType'] as UntypedFormControl;
    }
    get furnishType(): UntypedFormControl {
        return this.BasicInfo.controls['furnishType'] as UntypedFormControl;
    }


    get addressPricing(): UntypedFormGroup {
        return this.addPropertyForm.controls['addressPricing'] as UntypedFormGroup;
    }

    get country(): UntypedFormControl {
        return this.addressPricing.controls['country'] as UntypedFormControl;
    }
    get city(): UntypedFormControl {
        return this.addressPricing.controls['city'] as UntypedFormControl;
    }
    get streetAddress(): UntypedFormControl {
        return this.addressPricing.controls['streetAddress'] as UntypedFormControl;
    }
    get totalFloor(): UntypedFormControl {
        return this.addressPricing.controls['totalFloor'] as UntypedFormControl;
    }
    get floor(): UntypedFormControl {
        return this.addressPricing.controls['floor'] as UntypedFormControl;
    }
    get area(): UntypedFormControl {
        return this.addressPricing.controls['area'] as UntypedFormControl;
    }
    get landmark(): UntypedFormControl {
        return this.addressPricing.controls['landmark'] as UntypedFormControl;
    }
    get price(): UntypedFormControl {
        return this.addressPricing.controls['price'] as UntypedFormControl;
    }
    get otherCost(): UntypedFormControl {
        return this.addressPricing.controls['otherCost'] as UntypedFormControl;
    }




    ngOnDestroy(): void {
        this.fileUpload.clear();
        this.uploadedFiles = [];
        this.newFileUrls = [];
    }
}
