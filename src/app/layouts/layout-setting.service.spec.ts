import { TestBed } from '@angular/core/testing';

import { LayoutSettingService } from './layout-setting.service';

describe('LayoutSettingService', () => {
  let service: LayoutSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
