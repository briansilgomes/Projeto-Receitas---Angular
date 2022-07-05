import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddunityComponent } from './addunity.component';

describe('AddunityComponent', () => {
  let component: AddunityComponent;
  let fixture: ComponentFixture<AddunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
