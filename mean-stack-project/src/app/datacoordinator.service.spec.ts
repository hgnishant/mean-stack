import { TestBed } from '@angular/core/testing';

import { DatacoordinatorService } from './datacoordinator.service';

describe('DatacoordinatorService', () => {
  let service: DatacoordinatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatacoordinatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
