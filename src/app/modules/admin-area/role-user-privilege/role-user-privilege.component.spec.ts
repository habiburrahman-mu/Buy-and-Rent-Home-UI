import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUserPrivilegeComponent } from './role-user-privilege.component';

describe('RoleUserPrivilegeComponent', () => {
  let component: RoleUserPrivilegeComponent;
  let fixture: ComponentFixture<RoleUserPrivilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleUserPrivilegeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleUserPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
