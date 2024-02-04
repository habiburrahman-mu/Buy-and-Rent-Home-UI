import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
	selector: '[trimString]'
})
export class TrimStringDirective {

	constructor(
		private elementRef: ElementRef,
		private control: NgControl
	) { }

	@HostListener('focusout') onFocusOut() {
		const inputElement = this.elementRef.nativeElement as HTMLInputElement;
		inputElement.value = inputElement.value.trim();
		this.control.control?.setValue(inputElement.value);
	}

}
