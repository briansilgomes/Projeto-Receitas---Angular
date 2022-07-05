import { TestBed } from '@angular/core/testing';

import { ServiceCommentsService } from './service-comments.service';

describe('ServiceCommentsService', () => {
  let service: ServiceCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
