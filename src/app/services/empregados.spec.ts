import { TestBed } from '@angular/core/testing';

import { Empregados } from './empregados';

describe('Empregados', () => {
  let service: Empregados;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Empregados);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
