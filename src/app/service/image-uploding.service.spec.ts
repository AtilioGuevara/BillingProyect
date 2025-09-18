import { TestBed } from '@angular/core/testing';

import { ImageUplodingService } from './image-uploding.service';

describe('ImageUplodingService', () => {
  let service: ImageUplodingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageUplodingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
