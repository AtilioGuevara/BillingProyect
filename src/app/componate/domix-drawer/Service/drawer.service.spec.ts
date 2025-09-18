import { TestBed } from '@angular/core/testing';

import { DrawerService } from '../../../Core/service/Drawer/drawer.service';

describe('DrawerService', () => {
  let service: DrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
