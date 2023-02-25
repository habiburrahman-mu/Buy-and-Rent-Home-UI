import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPropertyListComponent } from './my-property-list.component';

describe('MyPropertyListComponent', () => {
  let component: MyPropertyListComponent;
  let fixture: ComponentFixture<MyPropertyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPropertyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPropertyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
