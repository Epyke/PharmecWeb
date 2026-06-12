import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { AuthService } from '../services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit { 
  username = '';
  password = '';
  rememberMe = false;
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['erro'] === 'acesso_negado') {
        this.errorMessage = 'Acesso Negado: O seu cargo não tem permissão para aceder à plataforma.';
      }
    });
  }

  handleLogin() {
    this.errorMessage = '';
    
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos.';
      return;
    }

    const credenciais = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credenciais, this.rememberMe).subscribe({
      next: (resposta) => {
        console.log('Login com sucesso!', resposta);
        
        this.router.navigate(['/dashboard']).then(() => {
          if (this.router.url.includes('acesso_negado')) {
            this.errorMessage = 'Acesso Negado: O seu cargo não tem permissão para aceder à plataforma.';
          }
        });
      },
      error: (erro) => {
        console.error('Erro no login:', erro);
        if (erro.status === 401 || erro.status === 403) {
          this.errorMessage = 'Utilizador ou palavra-passe incorretos.';
        } else {
          this.errorMessage = 'Erro ao contactar o servidor. Tente novamente.';
        }
      }
    });
  }
}