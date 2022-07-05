import { TestBed } from '@angular/core/testing';

import { ServiceRecipesService } from './service-recipes.service';

describe('ServiceRecipesService', () => {
  let service: ServiceRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
