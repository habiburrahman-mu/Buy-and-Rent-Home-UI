import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Property} from "../../models/Property";
import {environment} from "../../../environments/environment";
import {City} from "../../models/city";
import {IKeyValuePair} from "../../models/ikeyvaluepair";
import {Country} from "../../models/country";

@Injectable({
    providedIn: 'root'
})
export class HousingService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    newPropID(): number {
        if (localStorage.getItem('PID')) {
            let localStorageData = localStorage.getItem('PID') ?? '';
            localStorage.setItem('PID', String(+localStorageData + 1));
            return +localStorageData
        } else {
            localStorage.setItem('PID', '101');
            return 101;
        }
    }

    getPropertyAge(dateOfEstablishment: Date): string {
        const today = new Date();
        const estDate = new Date(dateOfEstablishment);
        let age = today.getFullYear() - estDate.getFullYear();
        const m = today.getMonth() - estDate.getMonth();

        // current month smaller than establishment month or
        // same month but current date smaller than establishment date

        if (m < 0 || (m == 0 && today.getDate() < estDate.getDate())) {
            age--;
        }

        // establishment date is future date
        if (today < estDate) {
            return '0';
        }

        // age is less than a year
        if (age == 0) {
            return 'Less than a year';
        }

        return age.toString();
    }
}
