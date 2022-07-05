import { TestBed } from '@angular/core/testing';

import { ServiceIngredientsService } from './service-ingredients.service';

describe('ServiceIngredientsService', () => {
  let service: ServiceIngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceIngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
