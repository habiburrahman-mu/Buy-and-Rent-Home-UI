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
    staticFileUrl: string = environment.baseUrl + '/staticfiles';
    propertyData: PropertyDetailDto;

    photos: PhotoDto[] = [];

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

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

        // this.photos = [
        //     {"imageSrc": "/assets/images/internal-1.jpg"},
        //     {"imageSrc": "/assets/images/internal-2.png"},
        //     {"imageSrc": "/assets/images/internal-3.jpg"},
        //     {"imageSrc": "/assets/images/internal-4.jpg"},
        //     {"imageSrc": "/assets/images/internal-1.jpg"},
        //     {"imageSrc": "/assets/images/internal-2.png"},
        //     {"imageSrc": "/assets/images/internal-3.jpg"},
        //     {"imageSrc": "/assets/images/internal-4.jpg"},
        //     {"imageSrc": "/assets/images/internal-1.jpg"},
        //     {"imageSrc": "/assets/images/internal-2.png"},
        //     {"imageSrc": "/assets/images/internal-3.jpg"},
        //     {"imageSrc": "/assets/images/internal-4.jpg"},
        //     {"imageSrc": "/assets/images/internal-1.jpg"},
        //     {"imageSrc": "/assets/images/internal-2.png"},
        //     {"imageSrc": "/assets/images/internal-3.jpg"},
        //     {"imageSrc": "/assets/images/internal-4.jpg"},
        //     {"imageSrc": "/assets/images/internal-1.jpg"},
        //     {"imageSrc": "/assets/images/internal-2.png"},
        //     {"imageSrc": "/assets/images/internal-3.jpg"},
        //     {"imageSrc": "/assets/images/internal-4.jpg"},
        //     {"imageSrc": "/assets/images/internal-1.jpg"},
        //     {"imageSrc": "/assets/images/internal-2.png"},
        //     {"imageSrc": "/assets/images/internal-3.jpg"},
        //     {"imageSrc": "/assets/images/internal-4.jpg"},
        //     {"imageSrc": "/assets/images/internal-1.jpg"},
        //     {"imageSrc": "/assets/images/internal-2.png"},
        //     {"imageSrc": "/assets/images/internal-3.jpg"},
        //     {"imageSrc": "/assets/images/internal-4.jpg"},
        //     {"imageSrc": "/assets/images/internal-1.jpg"},
        //     {"imageSrc": "/assets/images/internal-2.png"},
        //     {"imageSrc": "/assets/images/internal-3.jpg"},
        //     {"imageSrc": "/assets/images/internal-4.jpg"},
        //
        // ]
        //
        //
        //
        //     // this.galleryOptions = [
        //     //     {
        //     //         width: '100%',
        //     //         height: '400px',
        //     //         thumbnailsColumns: 4,
        //     //         imageAnimation: NgxGalleryAnimation.Slide
        //     //     }
        //     // ];
        //     //
        //     // this.galleryImages = [
        //     //     {
        //     //         small: '/assets/images/internal-1.jpg',
        //     //         medium: '/assets/images/internal-1.jpg',
        //     //         big: '/assets/images/internal-1.jpg'
        //     //     },
        //     //     {
        //     //         small: '/assets/images/internal-2.png',
        //     //         medium: '/assets/images/internal-2.png',
        //     //         big: '/assets/images/internal-2.png'
        //     //     },
        //     //     {
        //     //         small: '/assets/images/internal-3.jpg',
        //     //         medium: '/assets/images/internal-3.jpg',
        //     //         big: '/assets/images/internal-3.jpg'
        //     //     },
        //     //     {
        //     //         small: '/assets/images/internal-4.jpg',
        //     //         medium: '/assets/images/internal-4.jpg',
        //     //         big: '/assets/images/internal-4.jpg'
        //     //     }
        //     // ];
        //
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
