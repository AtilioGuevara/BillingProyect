import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, throwError } from 'rxjs';

/**
 * Interceptor para bloquear peticiones automáticas no deseadas
 * Específicamente para evitar llamadas a endpoints de validación que no existen
 */
export const blockUnwantedRequestsInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url.toLowerCase();
  
  // Bloquear peticiones a endpoints de validación automática
  const blockedEndpoints = [
    '/validation/cookie',
    '/api/auth/validation',
    '/authentication/verify',
    '/dummy'  // URL dummy que pusimos en AUTH_SERVICE_URL
  ];
  
  const shouldBlock = blockedEndpoints.some(endpoint => url.includes(endpoint));
  
  if (shouldBlock) {
    console.log('🚫 Interceptor: Bloqueando petición automática a:', req.url);
    // Retornar una respuesta exitosa ficticia para evitar errores
    return of({
      status: 200,
      statusText: 'OK',
      url: req.url,
      ok: true,
      body: { blocked: true, message: 'Petición bloqueada por interceptor' }
    } as any);
  }
  
  // Permitir todas las demás peticiones
  return next(req);
};