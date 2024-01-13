import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitingRequestCreateComponent } from './visiting-request-create.component';

describe('VisitingRequestCreateComponent', () => {
  let component: VisitingRequestCreateComponent;
  let fixture: ComponentFixture<VisitingRequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitingRequestCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitingRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
