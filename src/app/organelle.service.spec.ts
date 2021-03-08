import { TestBed } from '@angular/core/testing';

import { OrganelleService } from './organelle.service';

describe('OrganelleService', () => {
  let service: OrganelleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganelleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
