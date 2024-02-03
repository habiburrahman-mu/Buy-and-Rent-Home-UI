import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelPendingTourRequestModalComponent } from './cancel-pending-tour-request-modal.component';

describe('CancelPendingTourRequestModalComponent', () => {
  let component: CancelPendingTourRequestModalComponent;
  let fixture: ComponentFixture<CancelPendingTourRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelPendingTourRequestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelPendingTourRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
