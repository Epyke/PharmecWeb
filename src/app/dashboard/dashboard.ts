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
  
  // Dados do Cabeçalho
  userName = 'Diretora Técnica'; 
  dataAtual: string = '';
  
  // Inicializamos as variáveis a zero/vazio antes de o Java responder
  vendasDiarias = '0,00';
  reservasPendentes = 0;
  encomendasPendentes = 0;

  // Injetamos o nosso novo serviço no construtor
  constructor(private dashboardService: DashboardService,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.gerarDataAtual();
    this.carregarDadosDoBackend();
  }

  // Liga ao Spring Boot e atualiza o ecrã com dados reais
  carregarDadosDoBackend() {
    this.dashboardService.getStats().subscribe({
      next: (dadosReal) => {
        // Atribuição das variáveis
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

  handleSair() {
    console.log('A terminar sessão...');
  }
}