import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IProperty} from '../model/iproperty';
import {Property} from '../model/property';
import {IPropertyBase} from "../model/IPropertyBase";

@Injectable({
    providedIn: 'root'
})
export class HousingService {

    constructor(private http: HttpClient) {
    }

    getAllProperties(SellRent: number): Observable<IPropertyBase[]> {
        return this.http.get('data/properties.json').pipe(
            map(data => {
                const propertiesArray: Array<IPropertyBase> = [];
                for (const id in data) {
                    // @ts-ignore
                    if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
                        // @ts-ignore
                        propertiesArray.push(data[id]);
                    }
                }
                return propertiesArray;
            })
        );

        return this.http.get<IProperty[]>('data/properties.json');
    }

    addProperty(property: Property) {
        localStorage.setItem('newProp', JSON.stringify(property));
    }
}
