import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {PropertyCardComponent} from "./property/property-card/property-card.component";
import {PropertyListComponent} from './property/property-list/property-list.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {HttpClientModule} from '@angular/common/http';
import {HousingService} from "./services/housing.service";
import {AddPropertyComponent} from './property/add-property/add-property.component';
import {PropertyDetailComponent} from './property/property-detail/property-detail.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {UserService} from "./services/user.service";
import {AlertifyService} from "./services/alertify.service";
import {AuthService} from "./services/auth.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TabsModule} from "ngx-bootstrap/tabs";
import {ButtonsModule} from "ngx-bootstrap/buttons";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {PropertyDetailResolverService} from "./property/property-detail/property-detail-resolver.service";
import {NgxGalleryModule} from "@kolkov/ngx-gallery";
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import {ButtonModule} from "primeng/button";
import {ChipsModule} from "primeng/chips";
import {InputTextModule} from "primeng/inputtext";
import {DataViewModule} from "primeng/dataview";
import {RippleModule} from "primeng/ripple";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PaginatorModule} from "primeng/paginator";
import {DropdownModule} from "primeng/dropdown";

const appRoute: Routes = [
    {path: '', component: PropertyListComponent},
    {path: 'rent-property', component: PropertyListComponent},
    {path: 'add-property', component: AddPropertyComponent},
    {
        path: 'property-detail/:id',
        component: PropertyDetailComponent,
        resolve: {property: PropertyDetailResolverService}
    },
    {path: 'user/login', component: UserLoginComponent},
    {path: 'user/register', component: UserRegisterComponent},
    {path: '**', component: PropertyListComponent}
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
        SortPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoute),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ButtonsModule.forRoot(),
        BsDatepickerModule.forRoot(),
        NgxGalleryModule,
        ButtonModule,
        ChipsModule,
        InputTextModule,
        DataViewModule,
        RippleModule,
        FlexLayoutModule,
        PaginatorModule,
        DropdownModule
    ],
    providers: [
        HousingService,
        UserService,
        AlertifyService,
        AuthService,
        PropertyDetailResolverService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
