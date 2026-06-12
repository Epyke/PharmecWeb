import { TestBed } from '@angular/core/testing';

import { Graficos } from './graficos';

describe('Graficos', () => {
  let service: Graficos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Graficos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
