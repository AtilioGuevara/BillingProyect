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
    console.log('💾 Guardando token recibido del login externo...');
    
    // Guardar en localStorage (método más confiable)
    localStorage.setItem('authToken', token);
    
    // Establecer cookies para compatibilidad con backend
    const isHttps = window.location.protocol === 'https:';
    const secure = isHttps ? '; Secure' : '';
    
    // Cookie simple para el dominio actual
    const cookieString1 = `token=${token}; path=/${secure}; SameSite=Lax`;
    document.cookie = cookieString1;
    
    // Cookies adicionales con nombres alternativos
    document.cookie = `authToken=${token}; path=/${secure}; SameSite=Lax`;
    document.cookie = `access_token=${token}; path=/${secure}; SameSite=Lax`;
    
    // Intentar cookie con dominio compartido si estamos en HTTPS
    if (isHttps && window.location.hostname.includes('beckysflorist.site')) {
      const sharedCookie = `token=${token}; path=/; domain=.beckysflorist.site; SameSite=None; Secure`;
      document.cookie = sharedCookie;
      console.log('🌐 Cookie dominio compartido:', sharedCookie);
    }
    
    console.log('✅ Token guardado exitosamente:');
    console.log('  - localStorage: ✅');
    console.log('  - Cookies locales: ✅');
    console.log('  - Token length:', token.length);
    console.log('🔍 Verificando cookies después de guardar:', document.cookie);
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
    let callbackUrl = isLocal ? environment.auth.localCallbackUrl : environment.auth.callbackUrl;
    
    // SOLUCIÓN: Remover https:// del callback para evitar duplicación
    // El sistema del compañero parece agregar https:// automáticamente
    callbackUrl = callbackUrl.replace('https://', '').replace('http://', '');
    
    const loginUrl = environment.auth.externalLoginUrl;
    
    console.log('🔧 SOLUCIÓN - URLs sin protocolo:');
    console.log('  - callbackUrl original:', isLocal ? environment.auth.localCallbackUrl : environment.auth.callbackUrl);
    console.log('  - callbackUrl SIN protocolo:', callbackUrl);
    console.log('  - loginUrl:', loginUrl);
    
    // Construir URL completa con parámetros
    const params = new URLSearchParams({
      redirect: callbackUrl,  // Ahora sin https://
      clientId: 'billing-app',
      source: 'billing-system'
    });
    
    const fullLoginUrl = `${loginUrl}?${params.toString()}`;
    
    console.log('🔗 URL final (sin duplicación):', fullLoginUrl);
    console.log('🔗 Parámetro redirect:', callbackUrl);
    
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
    localStorage.setItem('waitingForAuth', 'true');
    
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