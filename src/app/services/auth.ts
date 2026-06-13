import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth/login'; 

  constructor(private http: HttpClient) { }

  // 1. Recebe as credenciais e o valor da checkbox (manterSessao)
  login(credentials: any, manterSessao: boolean = false): Observable<any> {

    // Limpa a casa antes de tentar entrar
    this.logout();

    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap(response => {
        if (response && response.accessToken) {
          
          // Decide onde guardar consoante a checkbox
          // localStorage: Sobrevive a fechar o browser
          // sessionStorage: Apaga-se quando fechas o separador
          const storage = manterSessao ? localStorage : sessionStorage;

          // Guarda os tokens na memória escolhida
          storage.setItem('jwt_token', response.accessToken);
          if (response.refreshToken) {
            storage.setItem('refresh_token', response.refreshToken);
          }

          // 4. Abre o Token para ver os detalhes
          const dadosDoToken = this.decodificarToken(response.accessToken);
          

          // Guarda o Cargo (idcargo)
          if (dadosDoToken && dadosDoToken.idcargo) {
            storage.setItem('idcargo', dadosDoToken.idcargo.toString());
          }

          // Guarda o Username (sub) logo a seguir, na mesma memória
          if (dadosDoToken && dadosDoToken.sub) {
            storage.setItem('username', dadosDoToken.sub);
          }
        }
      })
    );
  }

  logout() {
    // Limpa as duas memórias por segurança absoluta
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('idcargo');
    localStorage.removeItem('username');

    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('idcargo');
    sessionStorage.removeItem('username');
  }

  getToken(): string | null {
    //Procura a chave na gaveta do localStorage. Se não estiver lá, procura na gaveta do sessionStorage.
    return localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getIdCargo(): number | null {
    // procura o cargo
    const cargo = localStorage.getItem('idcargo') || sessionStorage.getItem('idcargo');
    return cargo ? parseInt(cargo, 10) : null;
  }

  // Ser mais fácil chamares o nome no teu Dashboard!
  getUsername(): string | null {
    return localStorage.getItem('username') || sessionStorage.getItem('username');
  }
  
  private decodificarToken(token: string): any {
    try {
      // O Token tem 3 partes separadas por pontos. A do meio (índice 1) tem os dados.
      const payload = token.split('.')[1];
      // atob() traduz de Base64 para texto normal legível
      const textoDecodificado = atob(payload);
      return JSON.parse(textoDecodificado);
    } catch (e) {
      console.error('Erro ao tentar decodificar o Token', e);
      return null;
    }
  }
}