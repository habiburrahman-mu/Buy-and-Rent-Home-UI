import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from 'src/app/Pipes/date-ago.pipe';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { SortPipe } from 'src/app/Pipes/sort.pipe';
import { PrimengLibModule } from '../primeng-lib/primeng-lib.module';

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

@NgModule({
  declarations: [
    ...pipes
  ],
  exports: [
    ...pipes, ...modules
  ]
})
export class SharedModule { }
