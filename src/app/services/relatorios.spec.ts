import { TestBed } from '@angular/core/testing';

import { Relatorios } from './relatorios';

describe('Relatorios', () => {
  let service: Relatorios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Relatorios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
