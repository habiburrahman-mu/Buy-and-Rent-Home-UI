import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {
    FormGroup,
    UntypedFormBuilder,
    Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {HousingService} from "../../services/housing.service";
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
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
import {HttpErrorResponse} from "@angular/common/http";
import {PhotoService} from "../../services/photo.service";
import {PropertyDetailDto} from "../../model/propertyDetailDto";
import {forkJoin, Observable, of, Subscription} from "rxjs";
import {PhotoDto} from "../../model/photoDto";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-add-property-dialog',
    templateUrl: './add-property-dialog.component.html',
    styleUrls: ['./add-property-dialog.component.css']
})


export class AddPropertyDialogComponent implements OnInit, OnDestroy {
    staticFileUrl: string = environment.baseUrl + '/staticfiles';
    @Input() editPropertyId = 0;
    @Output() closeAddPropertyDialogEvent = new EventEmitter<boolean>();
    @ViewChild('fileUpload') fileUpload: FileUpload;
    @ViewChild('tabView') tabView: TabView;

    addPropertyForm!: FormGroup<IAddEditPropertyForm>;
    property = new Property();
    propertyDetail: PropertyDetailDto;
    existingPhotos: ExistingPhotoDto[] = [];

    numOfTabs = 4;
    tabIndex: number;
    showLoader: boolean = false;

    isSubmitted: boolean = false;
    isPhotoGalleryModified = false;

    sellRentOptions: Array<{ label: string, value: number }> = [
        {label: 'Sell', value: 1},
        {label: 'Rent', value: 2}
    ];

    propertyTypeOptions: IKeyValuePair[];
    furnishTypeOptions: IKeyValuePair[];
    cityList: Array<any> = [{label: 'Select City', value: "", disabled: true}];
    countryList: Array<any> = [{label: 'Select Country', value: "", disabled: true}];

    uploadedFiles: any[] = [];
    newFileUrls: File[] = [];
    isPrimaryPhotoFromExistingImages: boolean = false;
    primaryPhotoIdOrIndex: number = 0;
    deletedExistingPhotos: number[] = [];

    constructor(private formBuilder: UntypedFormBuilder,
                private router: Router,
                private housingService: HousingService,
                private messageService: MessageService,
                private primeNGConfig: PrimeNGConfig,
                private cityService: CityService,
                private countryService: CountryService,
                private furnishingTypeService: FurnishingTypeService,
                private propertyTypeService: PropertyTypeService,
                private propertyService: PropertyService,
                private photoService: PhotoService,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit(): void {
        this.showLoader = true;
        this.primeNGConfig.ripple = true;
        this.CreateAddPropertyForm();

        this.tabIndex = 0;

        forkJoin([
            this.propertyTypeService.getPropertyTypes(),
            this.furnishingTypeService.getFurnishingTypes(),
            this.countryService.getAllCountries(),
            this.propertyDetailSubscription(),
        ]).subscribe({
            next: result => {
                this.showLoader = false;
                this.propertyTypeOptions = result[0];
                this.furnishTypeOptions = result[1];
                result[2].map(item => {
                    this.countryList.push({label: item.name, value: item.id});
                });
                if (result[3]) {
                    let propertyDetail = result[3];
                    this.propertyDetail = propertyDetail;
                    this.cityService.getAllCityByCountry(propertyDetail.countryId).subscribe(data => {
                        data.map(item => {
                            this.cityList.push({label: item.name, value: item.id});
                        });
                        this.showLoader = false;
                        this.bindDataToForm();
                    });
                    if (this.propertyDetail.photos.length > 0) {
                        this.isPrimaryPhotoFromExistingImages = true;
                        this.existingPhotos = this.propertyDetail.photos.map(photo => {
                            if (photo.isPrimary) {
                                this.primaryPhotoIdOrIndex = photo.id;
                            }
                            return {...photo, isDeleted: false};
                        });
                    }
                }
            },
            error: err => {
                this.showLoader = false;
            },
            complete: () => {
                this.showLoader = false;
                console.log(this.existingPhotos);
            }
        });
    }

    propertyDetailSubscription() {
        if (this.editPropertyId > 0) {
            return this.propertyService.getPropertyDetail(this.editPropertyId);
        }
        return of(null);
    }

    bindDataToForm() {
        this.addPropertyForm.setValue({
            basicInfo: {
                propertyName: this.propertyDetail.name,
                sellRent: this.propertyDetail.sellRent,
                propertyType: this.propertyDetail.propertyTypeId,
                furnishType: this.propertyDetail.furnishingTypeId,
                bedroom: this.propertyDetail.bedroom,
                bathroom: this.propertyDetail.bathroom,
                commonSpace: this.propertyDetail.commonSpace,
            },
            addressPricing: {
                country: this.propertyDetail.countryId,
                city: this.propertyDetail.cityId,
                streetAddress: this.propertyDetail.streetAddress,
                totalFloor: this.propertyDetail.totalFloor,
                floor: this.propertyDetail.floor,
                landmark: this.propertyDetail.landmark,
                area: this.propertyDetail.area,
                price: this.propertyDetail.rentPrice,
                otherCost: this.propertyDetail.otherCost,
            },
            others: {
                gym: this.propertyDetail.gym,
                parking: this.propertyDetail.parking,
                swimmingPool: this.propertyDetail.swimmingPool,
                description: this.propertyDetail.description,
            }
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

    deletePhotoFromExistingPhotoList(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete this photo?',
            header: 'Delete Existing Photo',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                let deletedItem = this.existingPhotos.find(item => item.id === id);
                if (deletedItem) {
                    deletedItem.isDeleted = true;
                    this.deletedExistingPhotos.push(deletedItem.id);
                    if (this.isPrimaryPhotoFromExistingImages && this.primaryPhotoIdOrIndex === id) {
                        this.primaryPhotoIdOrIndex = -1;
                    }
                    this.isPhotoGalleryModified = true;
                }
            }
        });
    }

    deleteFileFromNewFileUrlList(i: number) {
        this.newFileUrls.splice(i, 1);
        this.uploadedFiles.splice(i, 1);
        this.isPhotoGalleryModified = true;
    }


    handleFileChange() {
        console.log(this.fileUpload.files);
        if (this.fileUpload.files.length > 0) {
            for (let i = 0; i < this.fileUpload.files.length; i++) {
                this.isPhotoGalleryModified = true;
                this.uploadedFiles.push(this.fileUpload.files[i]);
                console.log(this.fileUpload.files[i]);
                let reader = new FileReader();
                reader.readAsDataURL(this.fileUpload.files[i]);
                reader.onload = (events: any) => {
                    this.newFileUrls.push(events.target.result);
                    console.log(events.target);
                }
            }

            this.fileUpload.clear();
        }
    }


    markThisPhotoAsPrimary(index: number, existingOrNew: 'existing' | 'new') {
        this.isPhotoGalleryModified = true;
        this.isPrimaryPhotoFromExistingImages = existingOrNew === "existing";
        this.primaryPhotoIdOrIndex = index;
    }

    onSubmit() {
        this.isSubmitted = true;
        this.addPropertyForm.markAllAsTouched();
        if ((this.uploadedFiles.length || this.existingPhotos.length) && this.primaryPhotoIdOrIndex === -1) {
            this.messageService.add({
                severity: 'error',
                summary: 'Add Property - Gallery',
                detail: 'Select primary photo'
            });
            return;
        }
        if (this.addPropertyForm.valid) {
            this.showLoader = true;
            this.mapProperty();
            this.propertyService.addProperty(this.property).subscribe({
                next: newPropertyId => {
                    // if (this.uploadedFiles.length > 0) {
                    if (this.isPhotoGalleryModified) {
                        this.uploadPhotosToServer(newPropertyId);
                    } else {
                        // do other things
                        this.showLoader = false;
                        this.closeAddPropertyDialogEvent.emit(true);
                    }
                    console.log(newPropertyId);
                },
                error: (error: HttpErrorResponse) => {
                    this.showLoader = false;
                    console.log(error);
                }
            });
        }

        console.log(this.addPropertyForm);
        console.log(this.property);
    }

    private uploadPhotosToServer(newPropertyId: number) {
        let formData = new FormData();
        this.uploadedFiles.forEach((item, index) => {
            formData.append("Files" + index, item);
        });
        formData.append("IsPrimaryPhotoFromExistingImages", this.isPrimaryPhotoFromExistingImages.toString());
        formData.append("PrimaryPhotoIdOrIndex", this.primaryPhotoIdOrIndex.toString());
        formData.append("DeletedPhotosId", this.deletedExistingPhotos.toString());

        this.photoService.uploadPhotos(newPropertyId, formData).subscribe({
            next: response => {
                this.showLoader = false;
                console.log(response);
                this.closeAddPropertyDialogEvent.emit(true);
            },
            error: (error: HttpErrorResponse) => {
                console.log(error);
                this.showLoader = false;

            }
        });
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
        this.property.id = this.propertyDetail?.id ?? 0;
        this.property.sellRent = this.sellRent.value!;
        this.property.name = this.propertyName.value!;
        this.property.propertyTypeId = this.propertyType.value!;
        this.property.furnishingTypeId = this.furnishType.value!;
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

    get isSubmittedAndFormInvalid() {
        return this.isSubmitted && this.addPropertyForm.invalid;
    }

    ngOnDestroy(): void {
        this.fileUpload.clear();
        this.uploadedFiles = [];
        this.newFileUrls = [];
    }
}

interface ExistingPhotoDto extends PhotoDto {
    isDeleted: boolean;
}
