import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	Validators,
	AbstractControl,
	ValidatorFn,
	ValidationErrors
} from "@angular/forms";
import { Router } from "@angular/router";
import { HousingService } from "../../../services/http/housing.service";
import { ConfirmationService, MessageService, PrimeNGConfig } from "primeng/api";
import { IKeyValuePair } from "../../../models/ikeyvaluepair";
import { FileUpload } from "primeng/fileupload";
import { TabView } from "primeng/tabview";
import { Property } from "../../../models/Property";
import { CityService } from "../../../services/http/city.service";
import { CountryService } from "../../../services/http/country.service";
import { FurnishingTypeService } from "../../../services/http/furnishing-type.service";
import { PropertyTypeService } from "../../../services/http/property-type.service";
import { PropertyService } from "../../../services/http/property.service";
import { HttpErrorResponse } from "@angular/common/http";
import { PhotoService } from "../../../services/http/photo.service";
import { PropertyDetailDto } from "../../../models/propertyDetailDto";
import { combineLatest, forkJoin, merge, Observable, of, Subject, Subscription, takeUntil } from "rxjs";
import { PhotoDto } from "../../../models/photoDto";
import { environment } from "../../../../environments/environment";
import LatitudeLongitude from 'src/app/models/latitudeLongitude';
import { Country } from 'src/app/models/country';
import { City } from 'src/app/models/city';
import { MessageSeverityConstants } from 'src/app/constants/message-constants';

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

	readonly DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	addPropertyForm = this.formBuilder.group({
		basicInfo: this.formBuilder.group({
			propertyName: this.formBuilder.control<string | null>(null, [Validators.required]),
			sellRent: this.formBuilder.control<number>(0, { validators: [Validators.required] }),
			propertyType: this.formBuilder.control<number>(0, { validators: [Validators.required] }),
			furnishType: this.formBuilder.control<number>(0, { validators: [Validators.required] }),
			bedroom: this.formBuilder.control<number | null>(null, { validators: [Validators.required] }),
			bathroom: this.formBuilder.control<number | null>(null, { validators: [Validators.required] }),
			commonSpace: this.formBuilder.control<number | null>(null),
		}),
		addressPricing: this.formBuilder.group({
			country: this.formBuilder.control<number | null>(null, { validators: [Validators.required] }),
			city: this.formBuilder.control<number | null>(null, { validators: [Validators.required] }),
			streetAddress: this.formBuilder.control<string | null>(null, [Validators.required]),
			totalFloor: this.formBuilder.control<number | null>(null, { validators: [Validators.required] }),
			floor: this.formBuilder.control<number | null>(null, { validators: [Validators.required] }),
			latitude: this.formBuilder.control<number | null>(null, { validators: [Validators.required] }),
			longitude: this.formBuilder.control<number | null>(null, { validators: [Validators.required] }),
			area: this.formBuilder.control<number | null>(null, { validators: [Validators.required] }),
			price: this.formBuilder.control<number | null>(null, { validators: [Validators.required] }),
			otherCost: this.formBuilder.control<number | null>(null),
		}),
		others: this.formBuilder.group({
			gym: this.formBuilder.control<boolean>(false, { validators: [Validators.required] }),
			parking: this.formBuilder.control<boolean>(false, { validators: [Validators.required] }),
			swimmingPool: this.formBuilder.control<boolean>(false, { validators: [Validators.required] }),
			description: this.formBuilder.control<string | null>(null),
		}),
		schedule: this.formBuilder.array(this.createScheduleDaysFormArray(), { validators: this.daysCheckValidator() }),
		startEndTime: this.formBuilder.group({
			startTime: this.formBuilder.control<Date | null>(null, { validators: [Validators.required] }),
			endTime: this.formBuilder.control<Date | null>(null, { validators: [Validators.required] }),
		}, { validators: [this.startEndTimeValidator()] })
	});
	property = new Property();
	propertyDetail: PropertyDetailDto;
	existingPhotos: ExistingPhotoDto[] = [];

	numOfTabs = 5;
	tabIndex: number;
	showLoader: boolean = false;

	isSubmitted: boolean = false;
	isPhotoGalleryModified = false;

	sellRentOptions: Array<{ label: string, value: number }> = [
		{ label: 'Sell', value: 1 },
		{ label: 'Rent', value: 2 }
	];

	propertyTypeOptions: IKeyValuePair[];
	furnishTypeOptions: IKeyValuePair[];
	cityList: Array<City> = [];
	countryList: Array<Country> = [];

	uploadedFiles: any[] = [];
	newFileUrls: File[] = [];
	isPrimaryPhotoFromExistingImages: boolean = false;
	primaryPhotoIdOrIndex: number = 0;
	deletedExistingPhotos: number[] = [];

	showMyPropertyMapModal = false;
	location: LatitudeLongitude | undefined = undefined;

	private ngDestroyed = new Subject<void>();

	createScheduleDaysFormArray() {
		return this.DAYS.map(day => {
			return this.formBuilder.control<boolean>(false, Validators.required);
		})
	}

	constructor(private formBuilder: FormBuilder,
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

		this.tabIndex = 0;

		this.loadData();

		combineLatest([
			this.latitude.valueChanges,
			this.longitude.valueChanges
		])
			.pipe(takeUntil(this.ngDestroyed))
			.subscribe(([latitude, longitude]) => {
				if (latitude && longitude)
					this.location = { latitude, longitude }
			});
	}

	private loadData() {
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
				this.countryList = result[2];
				if (result[3]) {
					let propertyDetail = result[3];
					this.propertyDetail = propertyDetail;
					this.cityService.getAllCityByCountry(propertyDetail.countryId).subscribe(data => {
						this.cityList = data;
						this.showLoader = false;
						this.bindDataToForm();
					});
					if (this.propertyDetail.photos.length > 0) {
						this.isPrimaryPhotoFromExistingImages = true;
						this.existingPhotos = this.propertyDetail.photos.map(photo => {
							if (photo.isPrimary) {
								this.primaryPhotoIdOrIndex = photo.id;
							}
							return { ...photo, isDeleted: false };
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
		this.addPropertyForm.patchValue({
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
				latitude: this.propertyDetail.latitude,
				longitude: this.propertyDetail.longitude,
				area: this.propertyDetail.area,
				price: this.propertyDetail.rentPrice,
				otherCost: this.propertyDetail.otherCost,
			},
			others: {
				gym: this.propertyDetail.gym,
				parking: this.propertyDetail.parking,
				swimmingPool: this.propertyDetail.swimmingPool,
				description: this.propertyDetail.description,
			},
			schedule: this.getDataForScheduleArray(),
			startEndTime: {
				startTime: this.getDateFromHourMinute(this.propertyDetail.availableStartTime),
				endTime: this.getDateFromHourMinute(this.propertyDetail.availableEndTime),
			}
		});
	}

	private getDataForScheduleArray() {
		let daysArrayFromServer = this.propertyDetail.availableDays?.split(',') ?? [];
		return this.DAYS.map(day => {
			return daysArrayFromServer.some(x => x === day);
		});
	}

	private getDateFromHourMinute(hourMinuteString: string) {
		var date = new Date();
		var splitted = hourMinuteString.split(':');
		if (splitted.length > 2) {
			const hour = parseInt(splitted[0]);
			const minute = parseInt(splitted[1]);

			date.setHours(hour);
			date.setMinutes(minute);
			date.setSeconds(0);
			date.setMilliseconds(0);
		}
		return date;
	}

	openPrevTab() {
		this.tabIndex = this.tabIndex - 1;
	}

	openNextTab() {
		this.tabIndex = this.tabIndex + 1;
	}

	onChangeCountry() {
		this.cityList = [];
		this.city.setValue(null);
		if (this.country.value) {
			this.createCityList(this.country.value);
		}
	}

	onChangeCity() {
		var selectedCityId = this.city.value ?? 0;
		if (selectedCityId > 0) {
			var city = this.cityList.find(x => x.id == selectedCityId)!;
			this.latitude.setValue(city.latitude);
			this.longitude.setValue(city.longitude);
		}
	}

	createCityList(countryId: number) {
		this.showLoader = true;
		this.cityService.getAllCityByCountry(countryId).subscribe(data => {
			this.cityList = data;
			// data.map(item => {
			// 	this.cityList.push({ label: item.name, value: item.id });
			// });
			this.showLoader = false;
		});
		// this.cityService.getAllCities().subscribe(data => {
		//     data.map(item => {
		//         this.cityList.push({label: item.name, value: item.id});
		//     });
		// });
	}

	openMapModal() {
		if (this.location) {
			this.showMyPropertyMapModal = true;
		} else {
			this.messageService.add({
				severity: MessageSeverityConstants.Warning,
				summary: 'Select City',
				detail: 'A city must be select to open map.',
			});
		}
	}

	onChangeStartTime() {
		this.onChangeTime(this.addPropertyForm.controls.startEndTime.controls.startTime);
	}

	onChangeEndTime() {
		this.onChangeTime(this.addPropertyForm.controls.startEndTime.controls.endTime);
	}

	private onChangeTime(control: AbstractControl<Date | null>) {
		if (control.value) {
			var minute = control.value.getMinutes();
			if (minute % 30 !== 0) {
				var roundedMinutes = Math.round(minute / 60) * 60;
				control.value.setMinutes(roundedMinutes);
			}
		}
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
			this.propertyService.saveProperty(this.property).subscribe({
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

	//#region getters for form
	get BasicInfo() {
		return this.addPropertyForm.controls.basicInfo;
	}

	get propertyName() {
		return this.BasicInfo.controls.propertyName;
	}

	get sellRent() {
		return this.BasicInfo.controls.sellRent;
	}

	get propertyType() {
		return this.BasicInfo.controls.propertyType;
	}

	get furnishType() {
		return this.BasicInfo.controls.furnishType;
	}

	get bedroom() {
		return this.BasicInfo.controls.bedroom;
	}

	get bathroom() {
		return this.BasicInfo.controls.bathroom;
	}

	get commonSpace() {
		return this.BasicInfo.controls.commonSpace;
	}

	get AddressPricing() {
		return this.addPropertyForm.controls.addressPricing;
	}

	get country() {
		return this.AddressPricing.controls.country;
	}

	get city() {
		return this.AddressPricing.controls.city;
	}

	get streetAddress() {
		return this.AddressPricing.controls.streetAddress;
	}

	get totalFloor() {
		return this.AddressPricing.controls.totalFloor;
	}

	get floor() {
		return this.AddressPricing.controls.floor;
	}

	get area() {
		return this.AddressPricing.controls.area;
	}

	get rentPrice() {
		return this.AddressPricing.controls.price;
	}

	get latitude() {
		return this.AddressPricing.controls.latitude;
	}

	get longitude() {
		return this.AddressPricing.controls.longitude;
	}

	get price() {
		return this.AddressPricing.controls.price;
	}

	get otherCost() {
		return this.AddressPricing.controls.otherCost;
	}

	get startEndTime() {
		return this.addPropertyForm.controls.startEndTime;
	}

	get Others() {
		return this.addPropertyForm.controls.others;
	}

	get gym() {
		return this.Others.controls.gym;
	}

	get parking() {
		return this.Others.controls.parking;
	}

	get swimmingPool() {
		return this.Others.controls.swimmingPool;
	}

	get description() {
		return this.Others.controls.description;
	}

	get schedule() {
		return this.addPropertyForm.controls.schedule;
	}

	//#endregion

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
		this.property.latitude = this.latitude.value;
		this.property.longitude = this.longitude.value;
		this.property.area = this.area.value!;
		this.property.rentPrice = this.rentPrice.value!;
		this.property.otherCost = this.otherCost.value;

		this.property.gym = this.gym.value ?? false;
		this.property.parking = this.parking.value ?? false;
		this.property.swimmingPool = this.swimmingPool.value ?? false;
		this.property.description = this.description.value;
		this.property.availableDays = this.availableDaysFromForm;
		this.property.availableStartTime = this.getHourMinuteStringFromDate(this.startEndTime.controls.startTime.value!);
		this.property.availableEndTime = this.getHourMinuteStringFromDate(this.startEndTime.controls.endTime.value!);
	}

	private getHourMinuteStringFromDate(date: Date) {
		const timeString = date.toTimeString();
		const hourMinute = timeString.split(':').filter((value, index) => index < 2).join(':');
		return hourMinute;

	}

	private get availableDaysFromForm() {
		let string = "";
		this.schedule.controls.forEach((control, index) => {
			if (control.value) {
				string += (string === "" ? '' : ',') + this.DAYS[index];
			}
		});
		return string;
	}

	get isSubmittedAndFormInvalid() {
		return this.isSubmitted && this.addPropertyForm.invalid;
	}

	onSelectMapLocation(event: LatitudeLongitude) {
		this.latitude.setValue(event.latitude);
		this.longitude.setValue(event.longitude);
	}

	ngOnDestroy(): void {
		this.fileUpload.clear();
		this.uploadedFiles = [];
		this.newFileUrls = [];
		this.ngDestroyed.next();
		this.ngDestroyed.complete();
	}

	private startEndTimeValidator(): ValidatorFn {
		return (): ValidationErrors | null => {
			if (!this.addPropertyForm) return null;
			const startTimeControl = this.addPropertyForm.controls.startEndTime.controls.startTime;
			const endTimeControl = this.addPropertyForm.controls.startEndTime.controls.endTime;
			if (startTimeControl.value && endTimeControl.value) {
				if (startTimeControl.value > endTimeControl.value)
					return { invalidTime: 'Start time cannot be less than end time.' }
				const minuteDiff = Math.ceil((endTimeControl.value.getTime() - startTimeControl.value.getTime()) / (1000 * 60));
				console.log(minuteDiff);
				if (minuteDiff < 30)
					return { invalidTime: 'Minimum 30 minutes difference required.' }
			}
			return null;
		}
	}

	private daysCheckValidator(): ValidatorFn {
		return (): ValidationErrors | null => {
			if (!this.addPropertyForm) return null;
			const controlList = this.schedule.controls;
			const anyChecked = controlList.some(control => control.value === true);
			if (!anyChecked)
				return { required: true };
			return null;
		}
	}
}

interface ExistingPhotoDto extends PhotoDto {
	isDeleted: boolean;
}
