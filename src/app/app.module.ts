import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HousingService } from "./services/housing.service";
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { AuthService } from "./services/auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';

import { AppLayoutComponent } from "./layout/app.layout.component";
import { AppLayoutModule } from "./layout/app.layout.module";
import { MyPropertyListComponent } from './property/my-property-list/my-property-list.component';

import { AddPropertyDialogComponent } from './shared/add-property-dialog/add-property-dialog.component';
import { MyPropertyCardComponent } from './property/my-property-card/my-property-card.component';

import { CityService } from "./services/city.service";
import { CountryService } from "./services/country.service";
import { FurnishingTypeService } from "./services/furnishing-type.service";
import { PropertyTypeService } from "./services/property-type.service";
import { PropertyService } from "./services/property.service";
import { HttpErrorInterceptorService } from "./services/interceptors/http-error-interceptor.service";
import { AuthInterceptor } from "./services/interceptors/auth.interceptor";
import { AuthGuard } from "./guards/auth.guard";

import { DateAgoPipe } from './Pipes/date-ago.pipe';
import { PrimengLibModule } from './modules/primeng-lib/primeng-lib.module';
import { ConfirmationService, MessageService } from 'primeng/api';


const appRoute: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [

            {
                path: "property",
                loadChildren: () => import('./modules/property-public/property-public.module').then(m => m.PropertyPublicModule)
            },
            {
                path: 'user-area', canActivateChild: [AuthGuard], children: [
                    { path: '', pathMatch: "full", redirectTo: 'my-property' },
                    { path: 'my-property', component: MyPropertyListComponent },
                ]
            },
            {
                path: 'add-property',
                component: AddPropertyComponent
            },
            { path: 'login', component: UserLoginComponent },
            { path: 'register', component: UserRegisterComponent },
            // {path: '**', component: PropertyListComponent}
        ]
    },


];

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        AddPropertyComponent,
        UserLoginComponent,
        UserRegisterComponent,
        FilterPipe,
        SortPipe,
        MyPropertyListComponent,
        AddPropertyDialogComponent,
        MyPropertyCardComponent,
        DateAgoPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoute, { useHash: true }),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        // BsDropdownModule.forRoot(),
        // TabsModule.forRoot(),
        // ButtonsModule.forRoot(),
        // BsDatepickerModule.forRoot(),

        AppLayoutModule,
        PrimengLibModule

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
        HousingService,
        CityService,
        CountryService,
        FurnishingTypeService,
        PropertyTypeService,
        PropertyService,
        AuthService,
        MessageService,
        ConfirmationService

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
