import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitysComponent } from './unitys.component';

describe('UnitysComponent', () => {
  let component: UnitysComponent;
  let fixture: ComponentFixture<UnitysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
