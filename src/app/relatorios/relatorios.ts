import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RelatoriosService } from '../services/relatorios';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css'
})
export class RelatoriosComponent {
  
  tipoRelatorio: string = 'vendas-mensais';
  dataInicio: string = '';
  dataFim: string = '';

  colunas: string[] = [];
  dados: any[] = [];
  relatorioGerado: boolean = false;

  // Injeta o serviço aqui no construtor
  constructor(private relatoriosService: RelatoriosService,
              private cdr: ChangeDetectorRef
  ) {}

  gerarRelatorio() {
    
    this.relatorioGerado = true;
    this.dados = []; 

    // 1. Configura os cabeçalhos das colunas primeiro no ecrã
    if (this.tipoRelatorio === 'vendas-mensais') {
      this.colunas = ['Data', 'Nº Fatura', 'Cliente', 'Total'];
    } 
    else if (this.tipoRelatorio === 'top-produtos') {
      this.colunas = ['Produto', 'Categoria', 'Quantidade Vendida', 'Receita Gerada'];
    } 
    else if (this.tipoRelatorio === 'vendas-funcionarios') {
      this.colunas = ['Funcionário', 'Cargo', 'Nº Vendas', 'Total Faturado'];
    }

    // 2. Vai buscar os dados ao java!
    this.relatoriosService.obterDados(this.tipoRelatorio, this.dataInicio, this.dataFim).subscribe({
      next: (dadosDoJava) => {
        
        this.dados = dadosDoJava; // Preenche a tabela automaticamente!
        this.cdr.detectChanges();
      },
      error: (err) => {
        alert("Erro ao carregar os dados do relatório.");
        console.error(err);
      }
    });
  }

  exportarPDF() {
    window.print();
  }
}