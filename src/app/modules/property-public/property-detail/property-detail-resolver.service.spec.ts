import { TestBed } from '@angular/core/testing';

import { PropertyDetailResolverService } from './property-detail-resolver.service';

describe('PropertyDetailResolverService', () => {
  let service: PropertyDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
