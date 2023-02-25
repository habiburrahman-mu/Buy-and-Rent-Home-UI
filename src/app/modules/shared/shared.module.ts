import { NgModule } from '@angular/core';
import { DateAgoPipe } from 'src/app/Pipes/date-ago.pipe';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { SortPipe } from 'src/app/Pipes/sort.pipe';

const pipes = [
    DateAgoPipe,
    FilterPipe,
    SortPipe
];

@NgModule({
  declarations: [
    ...pipes
  ],
  exports: [
    ...pipes
  ]
})
export class SharedModule { }
