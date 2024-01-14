import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourRequestByPropertyComponent } from './tour-request-by-property.component';

describe('TourRequestByPropertyComponent', () => {
  let component: TourRequestByPropertyComponent;
  let fixture: ComponentFixture<TourRequestByPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourRequestByPropertyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourRequestByPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
