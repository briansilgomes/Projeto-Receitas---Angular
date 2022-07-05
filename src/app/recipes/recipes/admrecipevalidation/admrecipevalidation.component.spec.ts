import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmrecipevalidationComponent } from './admrecipevalidation.component';

describe('AdmrecipevalidationComponent', () => {
  let component: AdmrecipevalidationComponent;
  let fixture: ComponentFixture<AdmrecipevalidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmrecipevalidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmrecipevalidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
