import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(initialArr: Array<string>, args: any[]): any {
      const sortField = args[0];
      initialArr.sort((a: any, b: any) => {
         if(a[sortField] < b[sortField]) {
             return -1;
         } else if (a[sortField] > b[sortField]) {
             return 1;
         } else {
             return 0;
         }
      });
    return initialArr;
  }

}
