import { TestBed } from '@angular/core/testing';

import { CustomPluginService } from './custom-plugin.service';

describe('CustomPluginService', () => {
  let service: CustomPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
