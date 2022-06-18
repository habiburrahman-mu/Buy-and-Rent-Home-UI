import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IProperty} from '../model/iproperty';
import {IPropertyBase} from "../model/IPropertyBase";
import {Property} from "../model/Property";

@Injectable({
    providedIn: 'root'
})
export class HousingService {

    constructor(private http: HttpClient) {
    }

    getAllCities(): Observable<string[]> {
        return this.http.get<string[]>('http://localhost:33615/api/city');
    }

    getAllProperties(SellRent?: number): Observable<Property[]> {
        return this.http.get('data/properties.json').pipe(
            map(data => {
                const propertiesArray: Array<Property> = [];
                let localStorageData = localStorage.getItem('newProp') ?? "[]";
                let localStoragePropertyList = JSON.parse(localStorageData);
                if (localStoragePropertyList) {
                    for (const id in localStoragePropertyList) {
                        if (SellRent) {
                            // @ts-ignore
                            if (localStoragePropertyList.hasOwnProperty(id) && localStoragePropertyList[id].SellRent === SellRent) {
                                // @ts-ignore
                                propertiesArray.push(localStoragePropertyList[id]);
                            }
                        } else {
                            propertiesArray.push(localStoragePropertyList[id]);
                        }

                    }
                }
                for (const id in data) {
                    if (SellRent) {
                        // @ts-ignore
                        if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
                            // @ts-ignore
                            propertiesArray.push(data[id]);
                        }
                    } else {
                        // @ts-ignore
                        propertiesArray.push(data[id]);
                    }
                }
                return propertiesArray;
            })
        );

        // return this.http.get<Property[]>('data/properties.json');
    }

    getProperty(id: number): Observable<Property> {
        return this.getAllProperties().pipe(map(properties => {
            const property = properties.find(prop => prop.Id == id);
            if(property) {
                return property;
            } else {
                throw new Error(`Property with ${id} not found`);
            }
        }))
    }

    addProperty(property: Property) {
        let newProp = [property];
        let localStoragePropertyData = localStorage.getItem('newProp') ?? "";
        if (localStoragePropertyData) {
            newProp = [property, ...JSON.parse(localStoragePropertyData)];
        }
        localStorage.setItem('newProp', JSON.stringify(newProp));
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
}
