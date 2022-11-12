import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Property} from "../../model/Property";
import {catchError, Observable, of} from "rxjs";
import {HousingService} from "../../services/housing.service";
import {PropertyService} from "../../services/property.service";
import {PropertyDetailDto} from "../../model/propertyDetailDto";

@Injectable({
    providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<PropertyDetailDto | null> {

    constructor(private router: Router,
                private propertyService: PropertyService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PropertyDetailDto | null> | Promise<PropertyDetailDto> | PropertyDetailDto {
        const propertyId = route.params['id'];
        return this.propertyService.getPropertyDetail(propertyId).pipe(catchError(error => {
            this.router.navigate(['/']);
            return of(null);
        }));
    }
}
