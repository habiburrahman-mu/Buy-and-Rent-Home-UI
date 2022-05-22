import {Component, OnInit} from '@angular/core';
import {HousingService} from "../../services/housing.service";
import {IProperty} from "../IProperty.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-property-list',
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
    SellRent: number = 1;
    properties: Array<IProperty> = [];

    constructor(private housingService: HousingService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.url.toString()) {
            this.SellRent = 2;
        }
        this.housingService.getAllProperties(this.SellRent).subscribe(data => {
            this.properties = data;
            console.log(this.route.snapshot.url.toString());
        }, error => {
            console.log(error);
        });
    }

}
