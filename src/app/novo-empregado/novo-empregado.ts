import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpregadosService } from '../services/empregados'; 

@Component({
  selector: 'app-novo-empregado',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], 
  templateUrl: './novo-empregado.html',
  styleUrl: './novo-empregado.css'
})
export class NovoEmpregadoComponent implements OnInit {
  
  empregadoForm!: FormGroup;
  modoEdicao: boolean = false; 
  idParaEditar: number | null = null;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private empregadosService: EmpregadosService 
  ) {}

  ngOnInit() {
    // 1. Criar a estrutura e as regras do formulário
    this.empregadoForm = this.fb.group({
      // Dados do Utilizador
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], 
      email: ['', [Validators.required, Validators.email]],
      telefone: [''], 
      
      // Dados do Funcionário
      nome: ['', Validators.required],
      nif: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      cc: ['', Validators.required],
      idCargo: ['', Validators.required]
    });

    // --- NOVA PARTE: LER A URL PARA VER SE É EDIÇÃO ---
    const paramId = this.route.snapshot.paramMap.get('id');
    
    if (paramId) {
      this.modoEdicao = true;
      this.idParaEditar = Number(paramId);

      // No modo edição, a password não é obrigatória (só preenche se quiser mudar)
      this.empregadoForm.get('password')?.clearValidators();
      this.empregadoForm.get('password')?.updateValueAndValidity();

      // Pede ao Java os dados deste empregado
      this.empregadosService.obterEmpregadoPorId(this.idParaEditar).subscribe({
        next: (dados) => {
          // Preenche magicamente as caixas de texto com os dados que vieram do Java
          this.empregadoForm.patchValue(dados);
        },
        error: (erro) => {
          alert("Erro ao carregar os dados do empregado.");
          this.router.navigate(['/empregados']);
        }
      });
    }
  }

  // 2. Função chamada quando clicamos no botão "Guardar"
  guardar() {
    // Se o formulário tiver erros (ex: password curta, NIF vazio)
    if (this.empregadoForm.invalid) {
      console.log("Campos inválidos:", this.empregadoForm.controls);
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      this.empregadoForm.markAllAsTouched(); // Fica tudo vermelho para o utilizador ver o que falta
      return;
    }

    // Se estiver tudo bem, pega nos dados
    const dadosFormulario = this.empregadoForm.value;
    
    // --- DECISÃO: ATUALIZAR OU CRIAR? ---
    if (this.modoEdicao && this.idParaEditar) {
      
      // 3A. Envia para o Java ATUALIZAR usando o nosso Serviço
      this.empregadosService.atualizarEmpregado(this.idParaEditar, dadosFormulario).subscribe({
        next: () => {
          alert("Empregado atualizado com sucesso!");
          this.router.navigate(['/empregados']);
        },
        error: (erro) => {
          alert("Não foi possível atualizar. Verifique se os dados estão corretos.");
        }
      });

    } else {

      // 3B. Envia para o Java CRIAR usando o nosso Serviço
      this.empregadosService.criarEmpregado(dadosFormulario).subscribe({
        next: (resposta) => {
          alert("Empregado registado com sucesso!");
          this.router.navigate(['/empregados']); 
        },
        error: (erro) => {
          // Se der erro, mostramos uma mensagem clara
          alert("Não foi possível registar o empregado. Verifique se os dados (como o Username ou NIF) já não estão a ser utilizados.");
        }
      });
      
    }
  }
}