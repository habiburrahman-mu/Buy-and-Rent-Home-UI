import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleHomeComponent } from './role-home.component';

describe('RoleHomeComponent', () => {
  let component: RoleHomeComponent;
  let fixture: ComponentFixture<RoleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
