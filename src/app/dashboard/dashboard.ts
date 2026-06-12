import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar';
import { DashboardService } from '../services/dashboard'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  
  // 1. Variáveis do Cabeçalho
  userName: string = ''; 
  dataAtual: string = '';
  
  // 2. Variáveis dos Gráficos e Estatísticas
  vendasDiarias = '0,00';
  reservasPendentes = 0;
  encomendasPendentes = 0;

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    //Vai buscar o nome gravado no login (ou usa 'Utilizador' se não encontrar)
    let nomeGuardado = localStorage.getItem('username') || sessionStorage.getItem('username') || 'Utilizador';
    
    //Coloca a primeira letra em maiúscula (ex: "ana" -> "Ana")
    this.userName = nomeGuardado.charAt(0).toUpperCase() + nomeGuardado.slice(1);

    //Trata da data e dos dados do Java
    this.gerarDataAtual();
    this.carregarDadosDoBackend();
  }

  // Liga ao Spring Boot e atualiza o ecrã com dados reais
  carregarDadosDoBackend() {
    this.dashboardService.getStats().subscribe({
      next: (dadosReal) => {
        this.vendasDiarias = dadosReal.vendasHoje || '0,00';
        this.reservasPendentes = dadosReal.reservasPendentes;
        this.encomendasPendentes = dadosReal.encomendasPendentes;

        this.cdr.detectChanges(); 
      },
      error: (erro) => {
        console.error('ERRO CRÍTICO NA REQUISIÇÃO:', erro);
      }
    });
  }

  gerarDataAtual() {
    const hoje = new Date();
    const formatadorDia = new Intl.DateTimeFormat('pt-PT', { weekday: 'long' });
    let diaSemana = formatadorDia.format(hoje);
    diaSemana = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1); 
    
    const formatadorData = new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' });
    let dataExtenso = formatadorData.format(hoje);
    dataExtenso = dataExtenso.replace(/\b([a-z])/g, char => char.toUpperCase());

    this.dataAtual = `${diaSemana}, ${dataExtenso}`;
  }
}