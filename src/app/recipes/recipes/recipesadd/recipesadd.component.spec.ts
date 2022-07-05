import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesaddComponent } from './recipesadd.component';

describe('RecipesaddComponent', () => {
  let component: RecipesaddComponent;
  let fixture: ComponentFixture<RecipesaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
