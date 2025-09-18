import { TestBed } from '@angular/core/testing';

import { DomixTableService } from './domix-table.service';

describe('DomixTableService', () => {
  let service: DomixTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomixTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
