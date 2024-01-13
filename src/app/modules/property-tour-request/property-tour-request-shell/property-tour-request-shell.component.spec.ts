import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTourRequestShellComponent } from './property-tour-request-shell.component';

describe('PropertyTourRequestShellComponent', () => {
  let component: PropertyTourRequestShellComponent;
  let fixture: ComponentFixture<PropertyTourRequestShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTourRequestShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyTourRequestShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
