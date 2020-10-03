import { TestBed } from '@angular/core/testing';

import { HeaderStyleService } from './header-style.service';

describe('HeaderStyleService', () => {
  let service: HeaderStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
