import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpregadosService {
  // O endereço do Controller criado no IntelliJ!
  private apiUrl = 'http://localhost:8080/api/funcionarios';

  constructor(private http: HttpClient) { }

  // Método para ir buscar a lista de todos os empregados
  getEmpregados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  
  criarEmpregado(dados: any): Observable<any> {
    // O POST envia os 'dados' para o 'apiUrl'
    return this.http.post(this.apiUrl, dados);
  }
}