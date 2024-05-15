import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'ordinal'
})
export class OrdinalPipe implements PipeTransform {

	private readonly ordinals: string[] = ['th', 'st', 'nd', 'rd'];

	transform(n: number, keepNumber: boolean = true): string {
		let v = n % 100;
		return (keepNumber ? n : '') + (this.ordinals[(v - 20) % 10] || this.ordinals[v] || this.ordinals[0]);
	}

}
