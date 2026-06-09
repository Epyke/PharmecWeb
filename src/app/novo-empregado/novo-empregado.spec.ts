import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoEmpregado } from './novo-empregado';

describe('NovoEmpregado', () => {
  let component: NovoEmpregado;
  let fixture: ComponentFixture<NovoEmpregado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoEmpregado],
    }).compileComponents();

    fixture = TestBed.createComponent(NovoEmpregado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
