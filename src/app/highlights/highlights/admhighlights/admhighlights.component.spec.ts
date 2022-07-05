import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmhighlightsComponent } from './admhighlights.component';

describe('AdmhighlightsComponent', () => {
  let component: AdmhighlightsComponent;
  let fixture: ComponentFixture<AdmhighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmhighlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmhighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
