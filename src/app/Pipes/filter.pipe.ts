import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(initialArr: any[], filterBy: string, propName: string): any[] {
        let resultArr = [];
        if (initialArr?.length === 0 || filterBy === '' || propName === '') {
            return initialArr
        }
        for (let item of initialArr) {
            if (item[propName] === filterBy) {
                resultArr.push(item);
            }
        }
        return resultArr;
    }
}
