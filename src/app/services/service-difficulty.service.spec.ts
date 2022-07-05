import { TestBed } from '@angular/core/testing';

import { ServiceDifficultyService } from './service-difficulty.service';

describe('ServiceDifficultyService', () => {
  let service: ServiceDifficultyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDifficultyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
