import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  private apiUrl = 'http://localhost:8080/api/relatorios';

  constructor(private http: HttpClient) {}

  obterDados(tipo: string, inicio: string, fim: string): Observable<any[]> {
    // Envia o pedido para a rota certa passando as datas escolhidas no ecrã
    return this.http.get<any[]>(`${this.apiUrl}/${tipo}?inicio=${inicio}&fim=${fim}`);
  }
}
