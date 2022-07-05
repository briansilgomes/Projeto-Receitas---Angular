import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfavoriteComponent } from './userfavorite.component';

describe('UserfavoriteComponent', () => {
  let component: UserfavoriteComponent;
  let fixture: ComponentFixture<UserfavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserfavoriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserfavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
