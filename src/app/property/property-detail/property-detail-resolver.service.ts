import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Property} from "../../model/Property";
import {catchError, Observable, of} from "rxjs";
import {HousingService} from "../../services/housing.service";
import {PropertyService} from "../../services/property.service";

@Injectable({
    providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

    constructor(private router: Router,
                private propertyService: PropertyService) {
    }

    // @ts-ignore
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property | null> | Promise<Property> | Property {
        const propertyId = route.params['id'];
        return this.propertyService.getProperty(propertyId).pipe(catchError(error => {
            this.router.navigate(['/']);
            return of(null);
        }));
    }
}
