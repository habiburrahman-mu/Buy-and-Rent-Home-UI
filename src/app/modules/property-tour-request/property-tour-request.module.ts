import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyTourRequestShellComponent } from './property-tour-request-shell/property-tour-request-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
	{path: "", component: PropertyTourRequestShellComponent},
];

@NgModule({
  declarations: [
		PropertyTourRequestShellComponent
	],
  imports: [
    CommonModule,
		SharedModule,
		RouterModule.forChild(routes)
  ]
})
export class PropertyTourRequestModule { }
