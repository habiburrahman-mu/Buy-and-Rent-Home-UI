import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitingRequestModalComponent } from './visiting-request-modal.component';

describe('VisitingRequestModalComponent', () => {
  let component: VisitingRequestModalComponent;
  let fixture: ComponentFixture<VisitingRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitingRequestModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitingRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
