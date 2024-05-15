import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from 'src/app/Pipes/date-ago.pipe';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { SortPipe } from 'src/app/Pipes/sort.pipe';
import { PrimengLibModule } from '../primeng-lib/primeng-lib.module';
import { LoginRegisterUnauthorizedModalComponent } from './components/login-register-unauthorized-modal/login-register-unauthorized-modal.component';
import { VisitingRequestModalComponent } from './components/visiting-request-modal/visiting-request-modal.component';
import { FormSkeletonComponent } from './components/skeletons/form-skeleton/form-skeleton.component';
import { VisitingRequestDetailComponent } from './components/visiting-request-detail/visiting-request-detail.component';
import { VisitingRequestCreateComponent } from './components/visiting-request-create/visiting-request-create.component';
import { ValueToLabelPipe } from 'src/app/Pipes/value-to-label.pipe';
import { VisitingRequestStatusBackgroundDirective } from 'src/app/modules/shared/directives/visiting-request-status-background/visiting-request-status-background.directive';
import { TrimStringDirective } from './directives/trim-string/trim-string.directive';
import { OrdinalPipe } from 'src/app/Pipes/ordinal.pipe';

const pipes = [
	DateAgoPipe,
	FilterPipe,
	SortPipe,
	ValueToLabelPipe,
	OrdinalPipe,
];

const modules = [
	FormsModule,
	ReactiveFormsModule,
	PrimengLibModule
];

const components = [
	LoginRegisterUnauthorizedModalComponent,
	VisitingRequestModalComponent,
	FormSkeletonComponent,
	VisitingRequestDetailComponent,
	VisitingRequestCreateComponent,
];

const directives = [
	VisitingRequestStatusBackgroundDirective,
	TrimStringDirective
];

@NgModule({
	declarations: [
		...pipes,
		...components,
		...directives,
	],
	imports: [
		PrimengLibModule
	],
	exports: [
		...pipes, ...modules, ...components, ...directives
	]
})
export class SharedModule { }
