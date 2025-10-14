import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    // Verificar si hay token en localStorage o cookies
    const token = this.getToken();
    
    console.log('🔐 AuthService.isAuthenticated() ->', !!token);
    
    // Debug: mostrar información sobre cookies disponibles
    if (!token) {
      console.log('🔍 Debug - Cookies disponibles:', document.cookie);
      console.log('🔍 Debug - LocalStorage authToken:', localStorage.getItem('authToken'));
    } else {
      console.log('✅ Token encontrado:', token.substring(0, 20) + '...');
    }
    
    return !!token;
  }
  //para recibir el token

  getToken(): string | null {
    // Primero intentar obtener de localStorage
    const localToken = localStorage.getItem('authToken');
    if (localToken && localToken !== 'null' && localToken !== 'undefined') {
      return localToken;
    }
    
    // Luego intentar obtener de cookies con diferentes nombres posibles
    const cookieNames = ['token', 'authToken', 'auth_token', 'access_token', 'jwt'];
    
    for (const cookieName of cookieNames) {
      const token = this.getCookie(cookieName);
      if (token && token !== 'null' && token !== 'undefined') {
        // Si encontramos un token válido en cookies, también guardarlo en localStorage
        localStorage.setItem('authToken', token);
        return token;
      }
    }
    
    return null;
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const value = c.substring(nameEQ.length, c.length);
        return value && value !== 'undefined' && value !== 'null' ? value : null;
      }
    }
    return null;
  }

  storeToken(token: string): void {
    // Guardar en localStorage
    localStorage.setItem('authToken', token);
    
    // También establecer como cookie para el backend
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    const cookieString = `token=${token}; path=/; SameSite=Lax${secure}`;
    document.cookie = cookieString;
    
    console.log('💾 Token guardado en localStorage y cookies');
    console.log('🍪 Cookie string:', cookieString);
  }

  logout(): void {
    console.log('👋 Cerrando sesión...');
    
    // Limpiar localStorage
    localStorage.removeItem('authToken');
    
    // Limpiar cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Redirigir al login
    this.redirectToLogin();
  }

  redirectToLogin(): void {
    // Determinar la URL de callback según el entorno
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const callbackUrl = isLocal ? environment.auth.localCallbackUrl : environment.auth.callbackUrl;
    
    const loginUrl = environment.auth.externalLoginUrl;
    
    // Construir URL completa con parámetros
    const params = new URLSearchParams({
      redirect: callbackUrl,
      clientId: 'billing-app',
      source: 'billing-system'
    });
    
    const fullLoginUrl = `${loginUrl}?${params.toString()}`;
    
    // Redirigir al sistema externo
    window.location.href = fullLoginUrl;
  }

  /**
   * Monitorear cookies después de redirigir al login
   * Esto detectará cuando tu compañero establezca la cookie
   */
  startLoginMonitoring(): void {
    console.log('🔄 Iniciando monitoreo de login...');
    
    // Marcar que estamos esperando un login
    sessionStorage.setItem('waitingForLogin', 'true');
    
    // Redirigir al login de tu compañero
    this.redirectToLogin();
  }

  /**
   * Verificar periódicamente si apareció la cookie del login
   */
  checkForLoginSuccess(): void {
    const waitingForLogin = sessionStorage.getItem('waitingForLogin');
    
    if (waitingForLogin === 'true') {
      console.log('👀 Monitoreando cookies de login...');
      
      const interval = setInterval(() => {
        console.log('🔍 Verificando cookies...', this.getAllCookies());
        
        if (this.isAuthenticated()) {
          console.log('✅ ¡Cookie de login detectada!');
          
          // Limpiar el monitoreo
          sessionStorage.removeItem('waitingForLogin');
          clearInterval(interval);
          
          // Redirigir a facturas
          window.location.href = '/final-consumer-bill/list';
        }
      }, 1000); // Verificar cada segundo
      
      // Timeout después de 2 minutos
      setTimeout(() => {
        if (sessionStorage.getItem('waitingForLogin') === 'true') {
          console.log('⏰ Timeout de login - deteniendo monitoreo');
          sessionStorage.removeItem('waitingForLogin');
          clearInterval(interval);
        }
      }, 120000); // 2 minutos
    }
  }

  private getAllCookies(): any {
    const cookies: any = {};
    if (document.cookie) {
      document.cookie.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
          cookies[name] = value.substring(0, 20) + '...';
        }
      });
    }
    return cookies;
  }

  // Método para procesar el token cuando el usuario regrese del login
  processReturnFromLogin(): void {
    console.log('🔄 Procesando retorno del login externo...');
    
    // Verificar si hay token en la URL (query params)
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    if (tokenFromUrl) {
      console.log('🔑 Token recibido del login externo via URL');
      this.storeToken(tokenFromUrl);
      
      // Limpiar la URL removiendo el token
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
      
      console.log('✅ Login procesado exitosamente');
      return;
    }

    // Verificar si hay token en cookies (método alternativo)
    const tokenFromCookie = this.getCookie('authToken') || this.getCookie('token');
    
    if (tokenFromCookie) {
      console.log('🔑 Token encontrado en cookies después del login');
      console.log('✅ Login procesado exitosamente');
      return;
    }
    
    console.log('⚠️ No se encontró token después del login');
  }
  
  /**
   * Manejar callback específico del login externo
   */
  handleLoginCallback(): void {
    this.processReturnFromLogin();
  }
  
  /**
   * Obtener token para usar en peticiones HTTP
   */
  getAuthToken(): string | null {
    return this.getToken();
  }
}