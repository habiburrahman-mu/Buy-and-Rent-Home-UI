import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyDialogComponent } from './add-property-dialog.component';

describe('AddPropertyDialogComponent', () => {
  let component: AddPropertyDialogComponent;
  let fixture: ComponentFixture<AddPropertyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPropertyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
