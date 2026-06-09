import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  // Nome que vai aparecer dinamicamente no canto superior
  userName = 'Diretora Técnica'; 
  
  // Dados de teste idênticos aos teus cartões para preencher o ecrã
  vendasDiarias = '45,89';
  reservasPendentes = 34;
  encomendasPendentes = 0;

  handleSair() {
    console.log('A terminar sessão...');
    // Lógica para limpar o token e voltar ao login
  }
}