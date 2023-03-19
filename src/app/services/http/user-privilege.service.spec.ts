import { TestBed } from '@angular/core/testing';

import { UserPrivilegeService } from './user-privilege.service';

describe('UserPrivilegeService', () => {
  let service: UserPrivilegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPrivilegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
