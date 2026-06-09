import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-sidebar', 
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {

  constructor(private router: Router) {}

  // A função que o botão "Sair" vai chamar
  logout() {
    localStorage.removeItem('token'); // Apaga o token
    this.router.navigate(['/login']); // Vai para o login
  }
}