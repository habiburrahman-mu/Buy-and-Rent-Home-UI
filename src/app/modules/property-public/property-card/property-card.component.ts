import { Component, Input, OnInit } from '@angular/core';
import { PropertyListDto } from 'src/app/models/propertyListDto';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-property-card',
    templateUrl: 'property-card.component.html',
    styleUrls: ['property-card.component.css']
})

export class PropertyCardComponent implements OnInit {
    @Input() propertyData: PropertyListDto;
    // @Input() hideIcons!: boolean;

    staticFileUrl: string = environment.baseUrl + environment.staticFilePath;

    defaultImagePath = "assets/images/house_default.png";

    ngOnInit(): void {
    }

}


