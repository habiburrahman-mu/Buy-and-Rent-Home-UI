import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-property-list',
    templateUrl: './property-list.component.html',
    styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

    properties: Array<any> = [
        {
            "Id": 1,
            "Name": "Birla House",
            "Type": "House",
            "Price": 12000
        },
        {
            "Id": 2,
            "Name": "Err Villa",
            "Type": "Apartment",
            "Price": 5000
        },
        {
            "Id": 3,
            "Name": "Home de Viru",
            "Type": "House",
            "Price": 16000
        },
        {
            "Id": 4,
            "Name": "Fashion House",
            "Type": "Apartment",
            "Price": 2000
        },
        {
            "Id": 5,
            "Name": "Test House",
            "Type": "House",
            "Price": 10000
        },
        {
            "Id": 6,
            "Name": "Nice Apartment",
            "Type": "Apartment",
            "Price": 7000
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
