import { TestBed } from '@angular/core/testing';

import { PropertyTypeService } from './property-type.service';

describe('PropertyTypeService', () => {
  let service: PropertyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
