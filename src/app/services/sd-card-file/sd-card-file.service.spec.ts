import { TestBed } from '@angular/core/testing';

import { SdCardFileService } from './sd-card-file.service';

describe('SdCardFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SdCardFileService = TestBed.get(SdCardFileService);
    expect(service).toBeTruthy();
  });
});
