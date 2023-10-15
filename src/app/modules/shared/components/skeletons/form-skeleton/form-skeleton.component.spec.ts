import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSkeletonComponent } from './form-skeleton.component';

describe('FormSkeletonComponent', () => {
  let component: FormSkeletonComponent;
  let fixture: ComponentFixture<FormSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
