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

  // A nossa função global de Sair
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}