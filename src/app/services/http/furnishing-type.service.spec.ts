import { TestBed } from '@angular/core/testing';

import { FurnishingTypeService } from './furnishing-type.service';

describe('FurnishingTypeService', () => {
  let service: FurnishingTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FurnishingTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
