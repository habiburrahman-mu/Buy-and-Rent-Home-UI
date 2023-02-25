import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PropertyListComponent } from './property-list/property-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { PropertyDetailResolverService } from './property-detail/property-detail-resolver.service';
import { PrimengLibModule } from '../primeng-lib/primeng-lib.module';
import { DateAgoPipe } from 'src/app/Pipes/date-ago.pipe';

const routes: Routes = [
    {path: "", component: PropertyListComponent},
    {path: "rent-property", component: PropertyListComponent},
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
    PropertyCardComponent,
    DateAgoPipe
  ],
  imports: [
    CommonModule,
    PrimengLibModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PropertyDetailResolverService,
  ]
})
export class PropertyPublicModule { }
