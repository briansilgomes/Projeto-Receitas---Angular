import { TestBed } from '@angular/core/testing';

import { ServiceUnitysService } from './service-unitys.service';

describe('ServiceUnitysService', () => {
  let service: ServiceUnitysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceUnitysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
