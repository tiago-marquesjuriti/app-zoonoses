import { TestBed } from '@angular/core/testing';

import { DbdengueService } from './dbdengue.service';

describe('DbdengueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbdengueService = TestBed.get(DbdengueService);
    expect(service).toBeTruthy();
  });
});
