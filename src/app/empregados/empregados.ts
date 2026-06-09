import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar'; 
import { EmpregadosService } from '../services/empregados'; 

@Component({
  selector: 'app-empregados',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent], 
  templateUrl: './empregados.html',
  styleUrl: './empregados.css'
})
export class EmpregadosComponent implements OnInit {
  listaEmpregados: any[] = [];
  carregando = true;

  constructor(private empregadosService: EmpregadosService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarEmpregados();
  }

  carregarEmpregados() {
    this.carregando = true;
    this.empregadosService.getEmpregados().subscribe({
      next: (dados) => {
        this.listaEmpregados = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error("Erro a carregar:", erro);
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }


  apagar(id: number, nome: string) {
    // 1. Pede confirmação para evitar apagar sem querer
    if (confirm(`Tem a certeza que deseja apagar o empregado ${nome}?`)) {
      
      // 2. Chama o serviço para apagar na base de dados
      this.empregadosService.apagarEmpregado(id).subscribe({
        next: () => {
          alert("Empregado apagado com sucesso.");
          this.carregarEmpregados(); // 3. Atualiza a tabela imediatamente
        },
        error: (erro) => {
          console.error("Erro ao apagar:", erro);
          alert("Erro: Não foi possível apagar o empregado.");
        }
      });
    }
 
}

reativar(id: number, nome: string) {
    if (confirm(`Deseja voltar a ativar o perfil de ${nome}?`)) {
      this.empregadosService.reativarEmpregado(id).subscribe({
        next: () => {
          alert("Empregado reativado com sucesso!");
          this.carregarEmpregados(); // Atualiza a tabela imediatamente
        },
        error: (erro) => {
          console.error("Erro ao reativar:", erro);
          alert("Não foi possível reativar o empregado.");
        }
      });
    }
  }
}