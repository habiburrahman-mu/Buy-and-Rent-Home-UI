import { Pipe, PipeTransform } from '@angular/core';
import ValueLabel from '../models/valueLabel';

@Pipe({
	name: 'valueToLabel'
})
export class ValueToLabelPipe implements PipeTransform {

	transform<T extends number | string>(value: T, valueLabelList: ValueLabel<T>[]): string {
		const valueLabel = valueLabelList.find(x => x.value === value);
		const label = valueLabel ? valueLabel.label : '';
		return label;
	}

}
