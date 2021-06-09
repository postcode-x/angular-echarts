import { TestBed } from '@angular/core/testing';

import { BittrexService } from './bittrex.service';

describe('BittrexService', () => {
  let service: BittrexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BittrexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
