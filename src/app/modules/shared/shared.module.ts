import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from 'src/app/Pipes/date-ago.pipe';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { SortPipe } from 'src/app/Pipes/sort.pipe';
import { PrimengLibModule } from '../primeng-lib/primeng-lib.module';
import { LoginRegisterUnauthorizedModalComponent } from './components/login-register-unauthorized-modal/login-register-unauthorized-modal.component';

const pipes = [
    DateAgoPipe,
    FilterPipe,
    SortPipe
];

const modules = [
    FormsModule,
    ReactiveFormsModule,
    PrimengLibModule
];

const components = [
    LoginRegisterUnauthorizedModalComponent
];

@NgModule({
    declarations: [
        ...pipes,
        ...components
    ],
    imports: [
        PrimengLibModule
    ],
    exports: [
        ...pipes, ...modules, ...components
    ]
})
export class SharedModule { }
