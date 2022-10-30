import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {PropertyCardComponent} from "./property/property-card/property-card.component";
import {PropertyListComponent} from './property/property-list/property-list.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HousingService} from "./services/housing.service";
import {AddPropertyComponent} from './property/add-property/add-property.component';
import {PropertyDetailComponent} from './property/property-detail/property-detail.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {AlertifyService} from "./services/alertify.service";
import {AuthService} from "./services/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TabsModule} from "ngx-bootstrap/tabs";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {PropertyDetailResolverService} from "./property/property-detail/property-detail-resolver.service";
import {FilterPipe} from './Pipes/filter.pipe';
import {SortPipe} from './Pipes/sort.pipe';
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {InputTextModule} from "primeng/inputtext";
import {DataViewModule} from "primeng/dataview";
import {RippleModule} from "primeng/ripple";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PaginatorModule} from "primeng/paginator";
import {DropdownModule} from "primeng/dropdown";
import {StyleClassModule} from "primeng/styleclass";
import {SelectButtonModule} from "primeng/selectbutton";
import {AppLayoutComponent} from "./layout/app.layout.component";
import {AppLayoutModule} from "./layout/app.layout.module";
import {MyPropertyListComponent} from './property/my-property-list/my-property-list.component';
import {ImageModule} from "primeng/image";
import {AddPropertyDialogComponent} from './shared/add-property-dialog/add-property-dialog.component';
import {MyPropertyCardComponent} from './property/my-property-card/my-property-card.component';
import {DialogModule} from "primeng/dialog";
import {StepsModule} from "primeng/steps";
import {CardModule} from "primeng/card";
import {TabMenuModule} from "primeng/tabmenu";
import {TabViewModule} from "primeng/tabview";
import {CalendarModule} from "primeng/calendar";
import {ProgressBarModule} from "primeng/progressbar";
import {SkeletonModule} from "primeng/skeleton";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadModule} from "primeng/fileupload";
import {SpeedDialModule} from "primeng/speeddial";
import {PasswordModule} from "primeng/password";
import {CityService} from "./services/city.service";
import {CountryService} from "./services/country.service";
import {FurnishingTypeService} from "./services/furnishing-type.service";
import {PropertyTypeService} from "./services/property-type.service";
import {PropertyService} from "./services/property.service";
import {HttpErrorInterceptorService} from "./services/interceptors/http-error-interceptor.service";
import {AuthInterceptor} from "./services/interceptors/auth.interceptor";

const appRoute: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            {path: '', component: PropertyListComponent},
            {path: 'rent-property', component: PropertyListComponent},
            {
                path: 'user-area', children: [
                    {path: '', pathMatch: "full", redirectTo: 'my-property'},
                    {path: 'my-property', component: MyPropertyListComponent},
                ]
            },
            {path: 'add-property', component: AddPropertyComponent},
            {
                path: 'property-detail/:id',
                component: PropertyDetailComponent,
                resolve: {property: PropertyDetailResolverService}
            },
            {path: 'login', component: UserLoginComponent},
            {path: 'register', component: UserRegisterComponent},
            {path: '**', component: PropertyListComponent}
        ]
    },


];

@NgModule({
    declarations: [
        AppComponent,
        PropertyCardComponent,
        PropertyListComponent,
        NavBarComponent,
        AddPropertyComponent,
        PropertyDetailComponent,
        UserLoginComponent,
        UserRegisterComponent,
        FilterPipe,
        SortPipe,
        MyPropertyListComponent,
        AddPropertyDialogComponent,
        MyPropertyCardComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoute, {useHash: true}),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ButtonsModule.forRoot(),
        BsDatepickerModule.forRoot(),
        ButtonModule,
        ChipsModule,
        InputTextModule,
        DataViewModule,
        RippleModule,
        FlexLayoutModule,
        PaginatorModule,
        DropdownModule,
        StyleClassModule,
        SelectButtonModule,
        DropdownModule,
        AppLayoutModule,
        ImageModule,
        DialogModule,
        StepsModule,
        CardModule,
        TabViewModule,
        CalendarModule,
        ProgressBarModule,
        SkeletonModule,
        CheckboxModule,
        InputTextareaModule,
        FileUploadModule,
        SpeedDialModule,
        PasswordModule
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
        AlertifyService,
        AuthService,
        PropertyDetailResolverService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
