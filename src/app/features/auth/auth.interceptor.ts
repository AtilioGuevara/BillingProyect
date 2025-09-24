import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokenService } from './auth-token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authTokenService = inject(AuthTokenService);

  console.log('🔐 AuthInterceptor - Interceptando petición:', req.url);

  // Excluir rutas que no necesitan Bearer token en header HTTP
  const excludedRoutes = [
    '/authentication/login'
    // final-consumer ahora SÍ necesita Bearer token en header
  ];

  if (excludedRoutes.some(route => req.url.includes(route))) {
    console.log('🔓 Request sin Bearer token:', req.url);
    return next(req);
  }

  const token = authTokenService.getTokenValue();
  
  if (token) {
    console.log('🔑 Agregando Bearer token al header HTTP');
    const authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  console.log('❌ Sin token disponible para:', req.url);
  return next(req);
};