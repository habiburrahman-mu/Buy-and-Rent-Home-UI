import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HousingService } from "./services/http/housing.service";
import { UserLoginComponent } from './public-pages/user-login/user-login.component';
import { UserRegisterComponent } from './public-pages/user-register/user-register.component';
import { AuthService } from "./services/auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppLayoutComponent } from "./layout/app.layout.component";
import { AppLayoutModule } from "./layout/app.layout.module";

import { CityService } from "./services/http/city.service";
import { CountryService } from "./services/http/country.service";
import { FurnishingTypeService } from "./services/http/furnishing-type.service";
import { PropertyTypeService } from "./services/http/property-type.service";
import { PropertyService } from "./services/http/property.service";
import { HttpErrorInterceptorService } from "./services/interceptors/http-error-interceptor.service";
import { AuthInterceptor } from "./services/interceptors/auth.interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from './modules/shared/shared.module';
import { HasRoleGuard } from './guards/has-role.guard';
import { RoleService } from './services/http/role.service';


const appRoute: Routes = [
	{
		path: '', component: AppLayoutComponent,
		children: [

			{
				path: "property",
				loadChildren: () => import('./modules/property-public/property-public.module').then(m => m.PropertyPublicModule)
			},
			{
				path: "user",
				children: [
					{ path: "", pathMatch: "full", redirectTo: "property" },
					{
						path: "property",
						canActivateChild: [AuthGuard, HasRoleGuard],
						data: {
							role: ['User']
						},
						loadChildren: () => import('./modules/property-user/property-user.module').then(m => m.PropertyUserModule)
					},
					{
						path: "tour-request",
						canActivateChild: [AuthGuard, HasRoleGuard],
						data: {
							role: ['User']
						},
						loadChildren: () => import('./modules/property-tour-request/property-tour-request.module').then(m => m.PropertyTourRequestModule)
					}
				]
			},
			{
				path: "admin",
				canActivateChild: [AuthGuard, HasRoleGuard],
				data: {
					role: ['Admin']
				},
				loadChildren: () => import('./modules/admin-area/admin-area.module').then(m => m.AdminAreaModule)
			},
			{ path: 'login', component: UserLoginComponent },
			{ path: 'register', component: UserRegisterComponent },
			{ path: '**', pathMatch: 'full', redirectTo: 'property' }
		]
	},


];

const httpServices = [
	HousingService,
	CityService,
	CountryService,
	FurnishingTypeService,
	PropertyTypeService,
	PropertyService,
	RoleService
];

@NgModule({
	declarations: [
		AppComponent,
		UserLoginComponent,
		UserRegisterComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(appRoute, { useHash: true }),
		BrowserAnimationsModule,
		AppLayoutModule,
		SharedModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptorService,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		...httpServices,
		AuthService,
		MessageService,
		ConfirmationService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
