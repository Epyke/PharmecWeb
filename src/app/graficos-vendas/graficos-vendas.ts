import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficosService } from '../services/graficos';
import { SidebarComponent } from '../sidebar/sidebar';
import { Router, RouterModule } from '@angular/router';
import Chart from 'chart.js/auto'; // 

@Component({
  selector: 'app-graficos-vendas',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './graficos-vendas.html',
  styleUrl: './graficos-vendas.css'
})
export class GraficosVendasComponent implements OnInit {

  chartEvolucao: any;
  chartCategorias: any;

  constructor(private graficosService: GraficosService,
              private router: Router
  ) {}

 
  ngOnInit() {
    this.carregarGraficoEvolucao();
    this.carregarGraficoCategorias();
  }

 carregarGraficoEvolucao() {
    this.graficosService.obterEvolucaoVendas().subscribe({
      next: (dados) => {
        const labels = dados.map(d => d.label);
        const valores = dados.map(d => d.value);

        this.chartEvolucao = new Chart('canvasEvolucao', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Total de Vendas',
              data: valores,
              backgroundColor: '#008a3d',
              borderRadius: 6
            }]
          },
          options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
               callbacks: {
                  label: function(context) {
                    let valor = context.parsed.y || 0; // ◄ Adicionamos o || 0 aqui!
                    return ' ' + new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(valor);
                  }
                }
              }
            }
          }
        });
      },
      error: (err) => console.error("Erro no gráfico de evolução:", err)
    });
  }

  carregarGraficoCategorias() {
    this.graficosService.obterReceitaCategorias().subscribe({
      next: (dados) => {
        const labels = dados.map(d => d.label);
        const valores = dados.map(d => d.value);

        this.chartCategorias = new Chart('canvasCategorias', {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: valores,
              backgroundColor: ['#008a3d', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
              hoverOffset: 4
            }]
          },
          options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let valor = (context.parsed as number) || 0;
                    let rotulo = context.label || '';
                    return rotulo + ': ' + new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(valor);
                  }
                }
              }
            }
          }
        });
      },
      error: (err) => console.error("Erro no gráfico de categorias:", err)
    });
  }

   logout() {
    localStorage.removeItem('token'); // Limpa a sessão
    this.router.navigate(['/login']); // Atira o utilizador para a página inicial
  }
}