import { Component, Input, OnInit } from '@angular/core';
import { IPropertyBase } from "../../model/IPropertyBase";

@Component({
    selector: 'app-property-card',
    templateUrl: 'property-card.component.html',
    styleUrls: ['property-card.component.css']
})

export class PropertyCardComponent implements OnInit {
    // @Input() property!: IPropertyBase;
    // @Input() hideIcons!: boolean;

    imageId: number = 0;

    imageArray = [
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8&w=1000&q=80',
        'https://cdn.pixabay.com/photo/2017/07/17/00/54/house-2511060__340.jpg',
        'https://media.rightmove.co.uk/dir/crop/10:9-16:9/213k/212894/123650294/212894_5_19_IMG_00_0000_max_476x317.jpeg',
        'https://i2.au.reastatic.net/800x600/548ee838b639acc6a3a15c6d4d4197698edc369fb3fc9abe6966696cbaf43926/main.jpg',
        'https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041__340.jpg',
        'https://i2.au.reastatic.net/800x600/706deb419a5a2780c0588850c7389e1124f6058251ec6eca30e1ad5bf73a47ce/main.jpg',
        'https://danddlaw.com/wp-content/uploads/2020/02/property-insurance.jpg',
        'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80',
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fG1hbnNpb258ZW58MHx8MHx8&w=1000&q=80',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OHx8fGVufDB8fHx8&w=1000&q=80',
        'https://thumbs.dreamstime.com/b/modern-living-australia-seaside-villas-mandurah-perth-69139764.jpg',
        'https://cdn.pixabay.com/photo/2017/07/08/02/16/house-2483336__340.jpg',
        'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80',
        'https://www.thehousedesigners.com/images/uploads/SiteImage-Landing-house-plans-with-photos-1.webp'
    ];

    ngOnInit(): void {
        this.imageId = this.getRandomArbitrary(0, this.imageArray.length-1);
    }

    getRandomArbitrary(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

}


