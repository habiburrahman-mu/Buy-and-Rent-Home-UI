import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTourRequestComponent } from './pending-tour-request.component';

describe('PendingTourRequestComponent', () => {
  let component: PendingTourRequestComponent;
  let fixture: ComponentFixture<PendingTourRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTourRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTourRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
