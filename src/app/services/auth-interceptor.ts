import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Usamos o 'inject' moderno do Angular para aceder ao nosso AuthService
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Se tivermos um token (o utilizador tem sessão iniciada), anexamos ao pedido
  if (token) {
    // Os pedidos HTTP são imutáveis. Temos de clonar o pedido para o alterar
    const pedidoCarimbado = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Enviamos o pedido modificado para o servidor (IntelliJ)
    return next(pedidoCarimbado);
  }

  // Se não houver token, deixamos passar o pedido original sem alterações.
  return next(req);
};