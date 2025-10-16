import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { getCookie, isValidToken, getTokenFromUrl, cleanUrlFromToken, isLocalEnvironment } from '../../../utils/common.utils';

/**
 * Servicio optimizado de autenticación para manejo del login externo
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly TOKEN_KEY = 'authToken';
  private readonly POSSIBLE_COOKIE_NAMES = [
    'token', 'authToken', 'auth_token', 'access_token', 'jwt', 'session',
    'session_token', 'auth', 'authentication', 'login_token',
    'colibrihub_token', 'colibrihub_auth', 'accounts_token'
  ];

  constructor(private router: Router) {}

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtener token de autenticación desde múltiples fuentes
   */
  getToken(): string | null {
    // 1. LocalStorage (más confiable)
    const localToken = localStorage.getItem(this.TOKEN_KEY);
    if (isValidToken(localToken)) {
      return localToken;
    }
    
    // 2. URL Parameters (para retorno del login)
    const urlToken = getTokenFromUrl();
    if (isValidToken(urlToken)) {
      this.storeToken(urlToken!);
      cleanUrlFromToken();
      return urlToken;
    }
    
    // 3. Cookies (múltiples nombres posibles)
    const cookieToken = this.getTokenFromCookies();
    if (isValidToken(cookieToken)) {
      localStorage.setItem(this.TOKEN_KEY, cookieToken!);
      return cookieToken;
    }
    
    // 4. SessionStorage (fallback)
    const sessionToken = this.getTokenFromSessionStorage();
    if (isValidToken(sessionToken)) {
      localStorage.setItem(this.TOKEN_KEY, sessionToken!);
      return sessionToken;
    }
    
    return null;
  }



  /**
   * Obtener token de cookies
   */
  private getTokenFromCookies(): string | null {
    for (const cookieName of this.POSSIBLE_COOKIE_NAMES) {
      const token = getCookie(cookieName);
      if (token) return token;
    }
    return null;
  }

  /**
   * Obtener token de sessionStorage
   */
  private getTokenFromSessionStorage(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY) || 
           sessionStorage.getItem('token') || 
           sessionStorage.getItem('access_token');
  }



  /**
   * Almacenar token en múltiples ubicaciones
   */
  storeToken(token: string): void {
    if (!isValidToken(token)) return;

    // Guardar en localStorage (método principal)
    localStorage.setItem(this.TOKEN_KEY, token);
    
    // Guardar cookies para compatibilidad
    const isHttps = window.location.protocol === 'https:';
    const secure = isHttps ? '; Secure' : '';
    const sameSite = '; SameSite=Lax';
    
    // Cookies principales
    document.cookie = `token=${token}; path=/${secure}${sameSite}`;
    document.cookie = `authToken=${token}; path=/${secure}${sameSite}`;
    
    // Cookie compartida para subdominios en producción
    if (isHttps && window.location.hostname.includes('beckysflorist.site')) {
      document.cookie = `token=${token}; path=/; domain=.beckysflorist.site; SameSite=None; Secure`;
    }
  }

  /**
   * Limpiar todas las ubicaciones del token
   */
  logout(): void {
    // Limpiar localStorage
    localStorage.removeItem(this.TOKEN_KEY);
    
    // Limpiar cookies principales
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Redirigir al login
    this.redirectToLogin();
  }

  /**
   * Redirigir al sistema de login externo
   */
  redirectToLogin(): void {
    let callbackUrl = isLocalEnvironment() ? environment.auth.localCallbackUrl : environment.auth.callbackUrl;
    
    // Remover protocolo para evitar duplicación
    callbackUrl = callbackUrl.replace(/^https?:\/\//, '');
    
    const loginUrl = `${environment.auth.externalLoginUrl}?redirect=${encodeURIComponent(callbackUrl)}`;
    
    // Marcar que estamos esperando auth
    localStorage.setItem('waitingForAuth', 'true');
    
    // Redirigir
    window.location.href = loginUrl;
  }

  /**
   * Procesar retorno del login externo
   */
  handleLoginReturn(): void {
    const token = getTokenFromUrl();
    
    if (token) {
      this.storeToken(token);
      cleanUrlFromToken();
      localStorage.removeItem('waitingForAuth');
    }
  }

  /**
   * Método de compatibilidad - alias para getToken()
   */
  getAuthToken(): string | null {
    return this.getToken();
  }

  /**
   * Método de compatibilidad - alias para handleLoginReturn()
   */
  processReturnFromLogin(): void {
    this.handleLoginReturn();
  }

  /**
   * Método de compatibilidad - alias para handleLoginReturn()
   */
  handleLoginCallback(): void {
    this.handleLoginReturn();
  }

  /**
   * Método de compatibilidad - verificar éxito de login
   */
  checkForLoginSuccess(): void {
    const token = this.getToken();
    if (token) {
      console.log('✅ Login verificado exitosamente');
    }
  }

  /**
   * Método de compatibilidad - iniciar monitoreo de login
   */
  startLoginMonitoring(): void {
    // Implementación simplificada - solo verificar una vez
    this.checkForLoginSuccess();
  }
}