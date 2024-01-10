import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitingRequestDetailComponent } from './visiting-request-detail.component';

describe('VisitingRequestDetailComponent', () => {
  let component: VisitingRequestDetailComponent;
  let fixture: ComponentFixture<VisitingRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitingRequestDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitingRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
