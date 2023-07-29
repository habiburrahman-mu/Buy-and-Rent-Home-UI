import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterUnauthorizedModalComponent } from './login-register-unauthorized-modal.component';

describe('LoginRegisterUnauthorizedModalComponent', () => {
  let component: LoginRegisterUnauthorizedModalComponent;
  let fixture: ComponentFixture<LoginRegisterUnauthorizedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterUnauthorizedModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegisterUnauthorizedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
