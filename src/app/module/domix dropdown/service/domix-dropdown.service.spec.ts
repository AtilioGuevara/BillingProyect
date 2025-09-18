import { TestBed } from '@angular/core/testing';

import { DomixDropdownService } from './domix-dropdown.service';

describe('DomixDropdownService', () => {
  let service: DomixDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomixDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
