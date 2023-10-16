import { TestBed } from '@angular/core/testing';

import { VisitingRequestService } from './visiting-request.service';

describe('VisitingRequestService', () => {
  let service: VisitingRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitingRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
