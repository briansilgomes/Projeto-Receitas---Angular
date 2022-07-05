import { TestBed } from '@angular/core/testing';

import { ServiceFavoriteService } from './service-favorite.service';

describe('ServiceFavoriteService', () => {
  let service: ServiceFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
