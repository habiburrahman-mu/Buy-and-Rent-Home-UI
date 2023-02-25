import {Component, OnInit} from '@angular/core';
import {HousingService} from 'src/app/services/housing.service';
import {ActivatedRoute} from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { IPropertyBase } from 'src/app/model/IPropertyBase';

@Component({
    selector: 'app-property-list',
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
    SellRent = 1;
    properties: IPropertyBase[];
    city: string = '';
    searchCity: string = '';
    sortByParameter: string = 'City';
    sortDirection: string = 'asc';

    emptyArray = new Array(10);

    rowsPerPageOptions: number[] = [5, 10, 20, 30];

    sortOptions = [
        {label: 'City', value: 'City'},
        {label: 'Price', value: 'Price'}
    ]




        constructor(private route: ActivatedRoute, private propertyService: PropertyService) {
    }

    ngOnInit(): void {
        if (this.route.snapshot.url.toString()) {
            this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
        }
        this.propertyService.getAllProperties(this.SellRent).subscribe(
            data => {
                this.properties = data;
                let dataFromLocalStorage = localStorage.getItem('newProp') ?? "[]";
                const newProperty = JSON.parse(dataFromLocalStorage);

                if (newProperty.SellRent === this.SellRent) {
                    this.properties = [newProperty, ...this.properties];
                }
            }, error => {
                console.log('http error:');
                console.log(error);
            }
        );
    }

    onCityFilter(clear: boolean = false) {
        if (clear) {
            this.city = '';
        }
        this.searchCity = this.city;
    }

    onSortDirection() {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
}
