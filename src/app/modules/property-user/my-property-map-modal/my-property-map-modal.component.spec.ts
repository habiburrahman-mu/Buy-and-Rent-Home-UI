import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPropertyMapModalComponent } from './my-property-map-modal.component';

describe('MyPropertyMapModalComponent', () => {
  let component: MyPropertyMapModalComponent;
  let fixture: ComponentFixture<MyPropertyMapModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPropertyMapModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPropertyMapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
