import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { PropertyDetailDto } from 'src/app/models/propertyDetailDto';
import { PropertyService } from 'src/app/services/http/property.service';

@Injectable({
	providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<PropertyDetailDto | null> {

	constructor(private router: Router,
		private propertyService: PropertyService) {
	}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PropertyDetailDto | null> {
		const propertyId = route.params['id'];
		return this.propertyService.getPropertyDetail(propertyId).pipe(
			map(x => {
				if (!x) {
					this.router.navigate(['/']);
					return null;
				}
				return x;
			}),
			catchError(error => {
				this.router.navigate(['/']);
				return of(null);
			}));
	}
}
