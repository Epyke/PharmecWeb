import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Mapeamento idêntico ao teu DashboardStatsDTO do Java
export interface DashboardStatsDTO {
  vendasHoje: string;
  reservasPendentes: number;
  encomendasPendentes: number;
  // Deixamos os alertas mapeados caso queiras usar no futuro
  stockBaixo: any[];
  validadesProximas: any[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  // Ajusta o início do URL se o teu servidor rodar noutra porta (ex: http://localhost:8080)
  private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) { }

  // Faz o pedido GET ao Spring Boot
  getStats(): Observable<DashboardStatsDTO> {
    return this.http.get<DashboardStatsDTO>(this.apiUrl);
  }
}