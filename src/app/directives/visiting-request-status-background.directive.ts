import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
	selector: '[visitingRequestStatusBg]'
})
export class VisitingRequestStatusBackgroundDirective {

	private readonly approvedClass = 'vr-approved';
	private readonly pendingClass = 'vr-pending';
	private readonly notApprovedClass = 'vr-not-approved';

	@Input() set visitingRequestStatusBg(value: string) {
		this.removeClassIfExists();
		this.applyAppropriateClass(value);
	}

	constructor(
		private renderer2: Renderer2,
		private elementRef: ElementRef
	) { }

	private removeClassIfExists() {
		this.renderer2.removeClass(this.elementRef.nativeElement, this.approvedClass);
		this.renderer2.removeClass(this.elementRef.nativeElement, this.pendingClass);
		this.renderer2.removeClass(this.elementRef.nativeElement, this.notApprovedClass);
	}

	private applyAppropriateClass(value: string) {
		switch (value) {
			case 'A':
				this.renderer2.addClass(this.elementRef.nativeElement, this.approvedClass);
				break;
			case 'P':
				this.renderer2.addClass(this.elementRef.nativeElement, this.pendingClass);
				break;
			case 'N':
				this.renderer2.addClass(this.elementRef.nativeElement, this.notApprovedClass);
				break;
		}
	}

}
