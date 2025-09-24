import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokenService } from './auth-token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authTokenService = inject(AuthTokenService);

  console.log('🔐 AuthInterceptor - Interceptando petición:', req.url);

  // No agregar token en rutas de autenticación según documentación
  if (req.url.includes('/authentication/login')) {
    console.log('🔓 Request sin token (login endpoint):', req.url);
    return next(req);
  }

  const token = authTokenService.getToken();
  
  if (token) {
    console.log('🔑 Agregando Bearer token a la petición');
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