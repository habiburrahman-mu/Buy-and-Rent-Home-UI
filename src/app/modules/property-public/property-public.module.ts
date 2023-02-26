import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { PropertyDetailResolverService } from './property-detail/property-detail-resolver.service';
import { PrimengLibModule } from '../primeng-lib/primeng-lib.module';
import { SharedModule } from '../shared/shared.module';
import { DateAgoPipe } from 'src/app/Pipes/date-ago.pipe';

const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "buy"},
    {path: "buy", component: PropertyListComponent},
    {path: "rent", component: PropertyListComponent},
    {
        path: 'detail/:id',
        component: PropertyDetailComponent,
        resolve: {property: PropertyDetailResolverService}
    }
];

@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyDetailComponent,
    PropertyCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PropertyDetailResolverService,
  ]
})
export class PropertyPublicModule { }
