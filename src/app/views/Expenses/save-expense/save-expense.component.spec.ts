import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveExpenseComponent } from './save-expense.component';

describe('SaveExpenseComponent', () => {
  let component: SaveExpenseComponent;
  let fixture: ComponentFixture<SaveExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
