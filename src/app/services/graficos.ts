import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {
  private apiUrl = 'http://localhost:8080/api/graficos';

  constructor(private http: HttpClient) {}

  obterEvolucaoVendas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/evolucao`);
  }

  obterReceitaCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorias`);
  }
}