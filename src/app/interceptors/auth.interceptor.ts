import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

/**
 * Interceptor para añadir credenciales automáticamente a las peticiones
 * y garantizar que las cookies se envíen al backend de facturación
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // URLs del backend de facturación que necesitan credenciales
  const billingBackendUrls = [
    '37.60.243.227:8080',        // API CREATE (IP directa)
    '37.60.243.227:8090',        // API READ (IP directa)
    'bill.beckysflorist.site',   // Dominio principal del backend
    'beckysflorist.site',        // Dominio base
    'localhost:8080',            // Desarrollo local
    'localhost:8090'             // Desarrollo local
  ];
  
  const url = req.url.toLowerCase();
  const needsCredentials = billingBackendUrls.some(backendUrl => url.includes(backendUrl));
  
  console.log('🔍 Auth Interceptor - Verificando URL:', req.url);
  console.log('🔍 URL en minúsculas:', url);
  console.log('🔍 ¿Necesita credenciales?', needsCredentials);
  console.log('🔍 URLs de billing configuradas:', billingBackendUrls);
  
  if (needsCredentials) {
    console.log('🔐 Auth Interceptor: Añadiendo credenciales a petición:', req.url);
    
    // Intentar obtener token desde localStorage o cookies
    let token = localStorage.getItem('authToken');
    if (!token) {
      // Buscar en cookies si no está en localStorage
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (['token', 'authToken', 'auth_token', 'access_token'].includes(name)) {
          token = value;
          break;
        }
      }
    }
    
    // Preparar headers
    let headers: { [key: string]: string } = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    // Añadir Authorization header si tenemos token
    if (token && token !== 'null' && token !== 'undefined') {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('🔑 Auth Interceptor: Token añadido como Bearer header');
    } else {
      console.log('⚠️ Auth Interceptor: No se encontró token válido');
    }
    
    // Clonar la petición y añadir withCredentials + headers
    const authReq = req.clone({
      setHeaders: headers,
      // Esto asegura que las cookies se envíen automáticamente
      withCredentials: true
    });
    
    return next(authReq);
  }
  
  // Para otras peticiones, enviar sin modificar
  return next(req);
};
