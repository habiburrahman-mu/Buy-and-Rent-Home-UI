import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTourRequestCardComponent } from './tour-request-card.component';

describe('PendingTourRequestCardComponent', () => {
  let component: PendingTourRequestCardComponent;
  let fixture: ComponentFixture<PendingTourRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTourRequestCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTourRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
