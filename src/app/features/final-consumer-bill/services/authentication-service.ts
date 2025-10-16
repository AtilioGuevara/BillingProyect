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

    console.log('💾 Guardando token en múltiples ubicaciones...');
    console.log('🔍 Token length:', token.length);
    console.log('🌐 Hostname:', window.location.hostname);
    console.log('🔒 Protocol:', window.location.protocol);

    // Guardar en localStorage (método principal)
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log('✅ Token guardado en localStorage');
    
    // Configurar cookies
    const isHttps = window.location.protocol === 'https:';
    const secure = isHttps ? '; Secure' : '';
    
    // Cookies para dominio actual
    document.cookie = `token=${token}; path=/${secure}; SameSite=Lax`;
    document.cookie = `authToken=${token}; path=/${secure}; SameSite=Lax`;
    console.log('✅ Cookies locales establecidas');
    
    // Cookie compartida para subdominios de beckysflorist.site
    if (window.location.hostname.includes('beckysflorist.site')) {
      // Para subdominios, usar dominio compartido
      document.cookie = `token=${token}; path=/; domain=.beckysflorist.site${secure}; SameSite=Lax`;
      document.cookie = `authToken=${token}; path=/; domain=.beckysflorist.site${secure}; SameSite=Lax`;
      
      // Si es HTTPS, también crear cookies más permisivas
      if (isHttps) {
        document.cookie = `token=${token}; path=/; domain=.beckysflorist.site; SameSite=None; Secure`;
        document.cookie = `authToken=${token}; path=/; domain=.beckysflorist.site; SameSite=None; Secure`;
      }
      console.log('✅ Cookies de subdominio establecidas para .beckysflorist.site');
    }
    
    // Verificar que las cookies se establecieron
    console.log('🍪 Cookies después de guardar:', document.cookie);
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
    console.log('🚀 Iniciando redirección a login...');
    
    // Limpiar cualquier token anterior
    localStorage.removeItem(this.TOKEN_KEY);
    console.log('🗑️ Token anterior limpiado');
    
    let callbackUrl = isLocalEnvironment() ? environment.auth.localCallbackUrl : environment.auth.callbackUrl;
    console.log('🔄 URL de callback original:', callbackUrl);
    
    // Remover protocolo para evitar duplicación
    callbackUrl = callbackUrl.replace(/^https?:\/\//, '');
    console.log('🔄 URL de callback procesada:', callbackUrl);
    
    const loginUrl = `${environment.auth.externalLoginUrl}?redirect=${encodeURIComponent(callbackUrl)}`;
    console.log('🔗 URL de login completa:', loginUrl);
    
    // Marcar que estamos esperando auth
    localStorage.setItem('waitingForAuth', 'true');
    console.log('⏳ Marcado como esperando autenticación');
    
    // Redirigir
    console.log('🌐 Redirigiendo a sistema de autenticación externo...');
    window.location.href = loginUrl;
  }

  /**
   * Procesar retorno del login externo
   */
  handleLoginReturn(): void {
    console.log('🔄 Procesando retorno del login externo...');
    console.log('📍 URL actual:', window.location.href);
    
    const token = getTokenFromUrl();
    console.log('🔍 Token extraído de URL:', token ? `${token.substring(0, 20)}...` : 'No encontrado');
    
    if (token) {
      console.log('✅ Token encontrado, almacenando...');
      this.storeToken(token);
      cleanUrlFromToken();
      localStorage.removeItem('waitingForAuth');
      console.log('🎉 Autenticación completada exitosamente');
    } else {
      console.log('❌ No se encontró token en la URL');
      
      // Verificar si hay token en cookies después de login
      const cookieToken = this.getTokenFromCookies();
      if (cookieToken) {
        console.log('🍪 Token encontrado en cookies, almacenando...');
        this.storeToken(cookieToken);
        localStorage.removeItem('waitingForAuth');
        console.log('🎉 Autenticación completada desde cookies');
      }
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
   * Redirige al login externo y configura monitoreo
   */
  startLoginMonitoring(): void {
    console.log('🔄 Iniciando monitoreo de login...');
    
    // Si ya está autenticado, no hacer nada
    if (this.isAuthenticated()) {
      console.log('✅ Usuario ya autenticado');
      return;
    }
    
    // Redirigir al login externo
    this.redirectToLogin();
  }
}