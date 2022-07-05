import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingredientComponent } from './editingredient.component';

describe('EditingredientComponent', () => {
  let component: EditingredientComponent;
  let fixture: ComponentFixture<EditingredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditingredientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditingredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
