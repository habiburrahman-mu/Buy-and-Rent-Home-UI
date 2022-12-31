import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HousingService} from 'src/app/services/housing.service';
import {Property} from '../../model/Property';
import {PropertyService} from "../../services/property.service";
import {PropertyDetailDto} from "../../model/propertyDetailDto";
import {PhotoService} from "../../services/photo.service";
import {PhotoDto} from "../../model/photoDto";
import {HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html',
    styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent {
    public propertyId: number = 0;
    staticFileUrl: string = environment.baseUrl + environment.staticFilePath;
    propertyData: PropertyDetailDto;

    photos: PhotoDto[] = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private propertyService: PropertyService,
                private photoService: PhotoService) {
    }

    //
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.propertyId = params['id'];
            if(this.propertyId > 0) {
                this.loadPropertyImages();
            }
        });
        this.route.data.subscribe((data: any) => {
            this.propertyData = data['property'];
        });
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
