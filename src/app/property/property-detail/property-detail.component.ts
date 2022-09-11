import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HousingService} from 'src/app/services/housing.service';
import {Property} from '../../model/Property';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "@kolkov/ngx-gallery";

@Component({
    selector: 'app-property-detail',
    templateUrl: './property-detail.component.html',
    styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
    public propertyId: number;
    property = new Property();

    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private housingService: HousingService) {
    }

    ngOnInit() {
        this.propertyId = +this.route.snapshot.params['id'];
        this.route.data.subscribe((data: any) => {
            this.property = data['property'];
            this.property.age = this.housingService.getPropertyAge(this.property.estPossessionOn!);
        });



        this.galleryOptions = [
            {
                width: '100%',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide
            }
        ];

        this.galleryImages = [
            {
                small: '/assets/images/internal-1.jpg',
                medium: '/assets/images/internal-1.jpg',
                big: '/assets/images/internal-1.jpg'
            },
            {
                small: '/assets/images/internal-2.png',
                medium: '/assets/images/internal-2.png',
                big: '/assets/images/internal-2.png'
            },
            {
                small: '/assets/images/internal-3.jpg',
                medium: '/assets/images/internal-3.jpg',
                big: '/assets/images/internal-3.jpg'
            },
            {
                small: '/assets/images/internal-4.jpg',
                medium: '/assets/images/internal-4.jpg',
                big: '/assets/images/internal-4.jpg'
            }
        ];

    }
}
