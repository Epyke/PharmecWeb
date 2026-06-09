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

  apagarEmpregado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // --- NOVAS FUNÇÕES PARA O EDITAR ---
  
  // Vai buscar os dados de apenas UM empregado para preencher o formulário
  obterEmpregadoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Envia as alterações (o PUT) para o Java gravar
  atualizarEmpregado(id: number, dados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, dados);
  }
  // Pede ao Java para mudar o estado para ativo novamente
  reativarEmpregado(id: number): Observable<any> {
    // O PUT exige um corpo (body), por isso enviamos um objeto vazio {}
    return this.http.put(`${this.apiUrl}/${id}/reativar`, {});
  }
}