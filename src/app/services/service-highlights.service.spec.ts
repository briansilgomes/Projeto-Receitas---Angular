import { TestBed } from '@angular/core/testing';

import { ServiceHighlightsService } from './service-highlights.service';

describe('ServiceHighlightsService', () => {
  let service: ServiceHighlightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceHighlightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
