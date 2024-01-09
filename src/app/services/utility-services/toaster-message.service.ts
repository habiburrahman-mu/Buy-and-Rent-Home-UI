import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToasterMessageService {

  constructor(
		private messageService: MessageService
	) { }

	success(message: string, summary?: string) {
		this.messageService.add({
			severity: 'success',
			detail: message,
			summary: summary ?? 'Saved Successfully'
		});
	}
}
