import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyTourRequestShellComponent } from './property-tour-request-shell/property-tour-request-shell.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PendingTourRequestComponent } from './pending-tour-request/pending-tour-request.component';
import { TourRequestByPropertyComponent } from './tour-request-by-property/tour-request-by-property.component';
import { PendingTourRequestCardComponent } from './tour-request-card/tour-request-card.component';
import { CancelPendingTourRequestModalComponent } from './cancel-pending-tour-request-modal/cancel-pending-tour-request-modal.component';

const routes: Routes = [
	{ path: "", component: PropertyTourRequestShellComponent },
];

@NgModule({
	declarations: [
		PropertyTourRequestShellComponent,
		PendingTourRequestComponent,
		TourRequestByPropertyComponent,
		PendingTourRequestCardComponent,
  CancelPendingTourRequestModalComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(routes)
	]
})
export class PropertyTourRequestModule { }
