import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPropertyListComponent } from './my-property-list/my-property-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimengLibModule } from '../primeng-lib/primeng-lib.module';
import { SharedModule } from '../shared/shared.module';
import { AddPropertyDialogComponent } from './add-property-dialog/add-property-dialog.component';
import { MyPropertyCardComponent } from './my-property-card/my-property-card.component';
import { MyPropertyMapModalComponent } from './my-property-map-modal/my-property-map-modal.component';

const routes: Routes = [
    { path: '', pathMatch: "full", redirectTo: 'my-property' },
    { path: 'my-property', component: MyPropertyListComponent },
];

@NgModule({
    declarations: [
        MyPropertyListComponent,
        MyPropertyCardComponent,
        AddPropertyDialogComponent,
        MyPropertyMapModalComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class PropertyUserModule { }
