import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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

  constructor(
    private fb: FormBuilder, 
    private router: Router,
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
    
    // 3. Envia para o Java usando o nosso Serviço
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