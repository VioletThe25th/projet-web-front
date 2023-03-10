import { TestBed } from '@angular/core/testing';

import { DatabaseCallService } from './database-call.service';

describe('DatabaseCallService', () => {
  let service: DatabaseCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
