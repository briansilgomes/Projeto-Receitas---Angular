import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditunityComponent } from './editunity.component';

describe('EditunityComponent', () => {
  let component: EditunityComponent;
  let fixture: ComponentFixture<EditunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
