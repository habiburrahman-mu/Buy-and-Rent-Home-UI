import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVisitingRequestComponent } from './create-visiting-request.component';

describe('CreateVisitingRequestComponent', () => {
  let component: CreateVisitingRequestComponent;
  let fixture: ComponentFixture<CreateVisitingRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVisitingRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVisitingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
