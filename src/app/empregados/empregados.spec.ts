import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empregados } from './empregados';

describe('Empregados', () => {
  let component: Empregados;
  let fixture: ComponentFixture<Empregados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Empregados],
    }).compileComponents();

    fixture = TestBed.createComponent(Empregados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
