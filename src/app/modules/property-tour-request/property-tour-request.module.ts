import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyTourRequestShellComponent } from './property-tour-request-shell/property-tour-request-shell.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{path: "", component: PropertyTourRequestShellComponent},
];

@NgModule({
  declarations: [
		PropertyTourRequestShellComponent
	],
  imports: [
    CommonModule,
		RouterModule.forChild(routes)
  ]
})
export class PropertyTourRequestModule { }
