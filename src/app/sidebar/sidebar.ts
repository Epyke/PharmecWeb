import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 
import { AuthService } from '../services/auth'; // 

@Component({
  selector: 'app-sidebar', 
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {

  // 2. Injetar o AuthService
  constructor(private router: Router, private authService: AuthService) {}

  // A função que o botão "Sair" vai chamar
  logout() {
    this.authService.logout(); // Apaga o jwt_token, refresh_token e idcargo!
    this.router.navigate(['/login']); // Vai para o login
  }
}