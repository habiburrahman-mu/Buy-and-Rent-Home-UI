import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoDto } from 'src/app/models/photoDto';
import { PropertyDetailDto } from 'src/app/models/propertyDetailDto';
import { PhotoService } from 'src/app/services/photo.service';
import { PropertyService } from 'src/app/services/property.service';
import { environment } from 'src/environments/environment';

import * as L from 'leaflet';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html',
    styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit, AfterViewInit {
    private map: any;
    public propertyId: number = 0;
    staticFileUrl: string = environment.baseUrl + environment.staticFilePath;
    propertyData: PropertyDetailDto;

    photos: PhotoDto[] = [];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private propertyService: PropertyService,
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
            this.propertyData.description = this.domSanitizer.sanitize(1, this.propertyData.description) ?? "";
        });


    }

    ngAfterViewInit(): void {
        this.initMap();
    }

    private initMap(): void {
        // this.map = L.map('map', {
        //   center: [ 39.8282, -98.5795 ],
        //   zoom: 3
        // });

        // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //   maxZoom: 18,
        //   minZoom: 3,
        //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        // });

        // tiles.addTo(this.map);
        // 23.780279, 90.416765
        var map = L.map('map').setView([23.780279, 90.416765], 12);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([23.780279, 90.416765]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();

        this.map = map;
    }

    loadPropertyImages() {
        this.photoService.getPhotoListByPropertyId(this.propertyId).subscribe({
            next: response => {
                this.photos = response;
            },
            error: (err: HttpErrorResponse) => {
                console.log(err);
            }
        })
    }
}
