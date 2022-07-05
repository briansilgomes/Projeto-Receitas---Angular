import { TestBed } from '@angular/core/testing';

import { ServicePermissionService } from './service-permission.service';

describe('ServicePermissionService', () => {
  let service: ServicePermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
