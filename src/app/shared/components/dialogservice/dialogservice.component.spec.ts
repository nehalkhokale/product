import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogserviceComponent } from './dialogservice.component';

describe('DialogserviceComponent', () => {
  let component: DialogserviceComponent;
  let fixture: ComponentFixture<DialogserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
