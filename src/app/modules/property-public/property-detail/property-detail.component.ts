import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoDto } from 'src/app/models/photoDto';
import { PropertyDetailDto } from 'src/app/models/propertyDetailDto';
import { PhotoService } from 'src/app/services/http/photo.service';
import { PropertyService } from 'src/app/services/http/property.service';
import { environment } from 'src/environments/environment';

import * as leaflet from 'leaflet';
import { DomSanitizer } from '@angular/platform-browser';
import { SellRent } from 'src/app/constants/enums';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-property-detail',
	templateUrl: './property-detail.component.html',
	styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit, AfterViewInit {
	SellRent = SellRent;
	private map: any;
	public propertyId: number = 0;
	staticFileUrl: string = environment.baseUrl + environment.staticFilePath;
	propertyData: PropertyDetailDto;

	photos: PhotoDto[] = [];

	displayFullScreenGallery = false;
	isLoginRegisterModalVisible = false;
	isVisitingRequestModalVisible = false;
	ismapZoomEnabled = false;

	isThisUsersProperty = false;
	isLoggedIn = false;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private propertyService: PropertyService,
		private authService: AuthService,
		private photoService: PhotoService,
		private domSanitizer: DomSanitizer) {
	}

	//
	ngOnInit() {
		this.route.params.subscribe(params => {
			this.propertyId = params['id'];
			if (this.propertyId > 0) {
				this.loadPropertyImages();
			}
		});
		this.route.data.subscribe((data: any) => {
			this.propertyData = data['property'];
			this.isThisUsersProperty = this.authService.isLoggedInUser(this.propertyData.postedBy);
			this.propertyData.description = this.domSanitizer.sanitize(1, this.propertyData.description) ?? "";
		});

		this.isLoggedIn = this.authService.isLoggedIn();
	}

	ngAfterViewInit(): void {
		this.initMap();
	}

	onClickContactOwner() {
		if (this.isLoggedIn) {
			this.isVisitingRequestModalVisible = true;
		} else {
			this.isLoginRegisterModalVisible = true;
		}
	}

	private initMap(): void {
		var map = leaflet.map('map');

		var propertyLocationExists = !!this.propertyData.latitude && !!this.propertyData.longitude;

		if (propertyLocationExists) {
			map.setView([this.propertyData.latitude!, this.propertyData.longitude!], 12);
			leaflet.marker([this.propertyData.latitude!, this.propertyData.longitude!]).addTo(map)
				.bindPopup(this.propertyData.name)
				.openPopup();

		} else {
			map.setView([this.propertyData.cityLatitude, this.propertyData.cityLongitude], 12);
			leaflet.circle([this.propertyData.cityLatitude, this.propertyData.cityLongitude], { radius: 5000, }).addTo(map);
		}

		map.scrollWheelZoom.disable();

		leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		this.map = map;
		map.on("click", (event) => {
			if (map.scrollWheelZoom.enabled()) {
				map.scrollWheelZoom.disable();
				this.ismapZoomEnabled = false;
			}
			else {
				map.scrollWheelZoom.enable();
				this.ismapZoomEnabled = true;
			}
			this.onClickMap(event);
		})
	}

	onClickMap(event: any) {
		console.log(event);
	}

	loadPropertyImages() {
		this.photoService.getPhotoListByPropertyId(this.propertyId).subscribe({
			next: response => {
				this.photos = response;
			},
			error: (err: HttpErrorResponse) => {
				console.log(err);
			}
		});
	}
}
