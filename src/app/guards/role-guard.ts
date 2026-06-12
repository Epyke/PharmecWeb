import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se a rota destino for o login, deixa passar sempre
  if (state.url.includes('/login')) {
    return true;
  }

  //Se não estiver logado, redireciona para o login silenciosamente
  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  const idcargo = authService.getIdCargo();

  //Se for Diretor Técnico (1) ou Admin (9), deixa passar
  if (idcargo === 1 || idcargo === 9) {
    return true; 
  }

  // Se o cargo for inválido, barra, limpa a sessão e manda aviso de erro!
  authService.logout(); 
  return router.createUrlTree(['/login'], { queryParams: { erro: 'acesso_negado' } });
};