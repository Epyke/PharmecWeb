import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosVendas } from './graficos-vendas';

describe('GraficosVendas', () => {
  let component: GraficosVendas;
  let fixture: ComponentFixture<GraficosVendas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficosVendas],
    }).compileComponents();

    fixture = TestBed.createComponent(GraficosVendas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
