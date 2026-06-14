import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RelatoriosService } from '../services/relatorios';
import { SidebarComponent } from '../sidebar/sidebar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent], 
  templateUrl: './relatorios.html',
  styleUrl: './relatorios.css',
})
export class RelatoriosComponent {
  
  tipoRelatorio: string = 'vendas-mensais';
  dataInicio: string = '';
  dataFim: string = '';
  maxTodayDate: string = new Date().toISOString().split('T')[0];

  colunas: string[] = [];
  dados: any[] = [];
  relatorioGerado: boolean = false;

  // Injeta o serviço aqui no construtor
  constructor(private relatoriosService: RelatoriosService,
              private cdr: ChangeDetectorRef,
              private router: Router
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

  imprimir() {
    window.print();
  }

  descarregarPDF() {
    // 1. Cria o documento PDF puro (A4, Vertical)
    const doc = new jsPDF('p', 'mm', 'a4');

    // 2. Adiciona um título bonito ao documento
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Pharmec - Relatório Oficial', 14, 20);

    // Subtítulo com o tipo de relatório
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(100);
    
    let nomeRelatorio = 'Relatório de Vendas';
    if (this.tipoRelatorio === 'top-produtos') nomeRelatorio = 'Relatório de Top Produtos';
    if (this.tipoRelatorio === 'vendas-funcionarios') nomeRelatorio = 'Relatório de Vendas por Funcionário';
    
    doc.text(nomeRelatorio, 14, 28);

    // Linha de datas do período
    const periodo = `Período: ${this.dataInicio ? this.dataInicio : 'Todo o tempo'} a ${this.dataFim ? this.dataFim : 'Todo o tempo'}`;
    doc.text(periodo, 14, 35);

    // 3. Formatar os teus dados para o formato que o autoTable precisa
    // O autoTable espera um array de arrays (linhas com os valores das colunas)
    const linhasDaTabela = this.dados.map(linha => [
      linha.col1,
      linha.col2,
      linha.col3,
      linha.col4
    ]);

    // 4. Gerar a tabela automaticamente
    autoTable(doc, {
      head: [this.colunas], // Cabeçalho (ex: ['Data', 'Nº Fatura', 'Cliente', 'Total'])
      body: linhasDaTabela,  // Os dados das linhas
      startY: 45,            // Onde a tabela começa (abaixo do título)
      theme: 'striped',      // Estilo de linhas intercaladas (cinzento e branco)
      headStyles: { fillColor: [40, 167, 69] }, // Cor azul para o cabeçalho (podes mudar para a cor da tua app)
      styles: { font: 'helvetica', fontSize: 10 },
      margin: { top: 20, right: 14, bottom: 20, left: 14 }
    });

    // 5. Faz o download instantâneo!
    doc.save(`relatorio-${this.tipoRelatorio}-${new Date().toISOString().split('T')[0]}.pdf`);
  }

  logout() {
    localStorage.removeItem('token'); // Limpa a sessão
    this.router.navigate(['/login']); // Atira o utilizador para a página inicial
  }
}