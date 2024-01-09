import { TestBed } from '@angular/core/testing';

import { ToasterMessageService } from './toaster-message.service';

describe('ToasterMessageService', () => {
  let service: ToasterMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToasterMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
