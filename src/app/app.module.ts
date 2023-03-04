import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HousingService } from "./services/housing.service";
import { UserLoginComponent } from './public-pages/user-login/user-login.component';
import { UserRegisterComponent } from './public-pages/user-register/user-register.component';
import { AuthService } from "./services/auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppLayoutComponent } from "./layout/app.layout.component";
import { AppLayoutModule } from "./layout/app.layout.module";

import { CityService } from "./services/city.service";
import { CountryService } from "./services/country.service";
import { FurnishingTypeService } from "./services/furnishing-type.service";
import { PropertyTypeService } from "./services/property-type.service";
import { PropertyService } from "./services/property.service";
import { HttpErrorInterceptorService } from "./services/interceptors/http-error-interceptor.service";
import { AuthInterceptor } from "./services/interceptors/auth.interceptor";
import { AuthGuard } from "./guards/auth.guard";
import { PrimengLibModule } from './modules/primeng-lib/primeng-lib.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from './modules/shared/shared.module';


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
                        canActivateChild: [AuthGuard],
                        loadChildren: () => import('./modules/property-user/property-user.module').then(m => m.PropertyUserModule)
                    }
                ]
            },
            { path: 'login', component: UserLoginComponent },
            { path: 'register', component: UserRegisterComponent },
            {path: '**', pathMatch: 'full', redirectTo: 'property'}
        ]
    },


];

@NgModule({
    declarations: [
        AppComponent,
        UserLoginComponent,
        UserRegisterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoute, { useHash: true }),
        BrowserAnimationsModule,
        // BsDropdownModule.forRoot(),
        // TabsModule.forRoot(),
        // ButtonsModule.forRoot(),
        // BsDatepickerModule.forRoot(),

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
