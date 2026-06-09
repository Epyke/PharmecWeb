import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpregadosService } from '../services/empregados'; 


@Component({
  selector: 'app-empregados',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './empregados.html',
  styleUrl: './empregados.css'
})

export class EmpregadosComponent implements OnInit {
  listaEmpregados: any[] = [];
  carregando = true;

  constructor(
    private empregadosService: EmpregadosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarEmpregados();
  }

  carregarEmpregados() {
    this.empregadosService.getEmpregados().subscribe({
      next: (dados) => {
        this.listaEmpregados = dados;
        this.carregando = false;
        this.cdr.detectChanges();
        console.log('Empregados carregados:', dados);
      },
      error: (erro) => {
        console.error('Erro ao carregar empregados:', erro);
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }
}