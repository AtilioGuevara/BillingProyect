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
    'token',          // Prioridad alta - la que se ve en tu screenshot
    'authToken',      // Prioridad alta - la que guardamos
    'access_token',   // Estándar OAuth
    'jwt',           // JSON Web Token estándar
    'auth_token',    // Variante común
    'session_token', // Token de sesión
    'auth',          // Token simple
    'authentication' // Token de autenticación
  ];

  constructor(private router: Router) {}

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Obtener token de autenticación desde múltiples fuentes con debug mejorado
   */
  getToken(): string | null {
    console.log('🔍 Buscando token de autenticación...');
    
    // 1. LocalStorage (más confiable)
    const localToken = localStorage.getItem(this.TOKEN_KEY);
    console.log(`📱 LocalStorage (${this.TOKEN_KEY}):`, localToken ? `${localToken.substring(0, 20)}...` : 'No encontrado');
    if (isValidToken(localToken)) {
      console.log('✅ Token válido encontrado en localStorage');
      return localToken;
    }
    
    // 2. LocalStorage con nombre 'token'
    const simpleLocalToken = localStorage.getItem('token');
    console.log('📱 LocalStorage (token):', simpleLocalToken ? `${simpleLocalToken.substring(0, 20)}...` : 'No encontrado');
    if (isValidToken(simpleLocalToken)) {
      console.log('✅ Token válido encontrado en localStorage como "token"');
      // Sincronizar con la clave principal
      localStorage.setItem(this.TOKEN_KEY, simpleLocalToken!);
      return simpleLocalToken;
    }
    
    // 3. URL Parameters (para retorno del login)
    const urlToken = getTokenFromUrl();
    if (isValidToken(urlToken)) {
      console.log('✅ Token válido encontrado en URL');
      this.storeToken(urlToken!);
      cleanUrlFromToken();
      return urlToken;
    }
    
    // 4. Cookies (múltiples nombres posibles)
    console.log('🍪 Buscando en cookies...');
    const cookieToken = this.getTokenFromCookies();
    if (isValidToken(cookieToken)) {
      console.log('✅ Token válido encontrado en cookies, sincronizando con localStorage');
      localStorage.setItem(this.TOKEN_KEY, cookieToken!);
      return cookieToken;
    }
    
    // 5. SessionStorage (fallback)
    const sessionToken = this.getTokenFromSessionStorage();
    if (isValidToken(sessionToken)) {
      console.log('✅ Token válido encontrado en sessionStorage');
      localStorage.setItem(this.TOKEN_KEY, sessionToken!);
      return sessionToken;
    }
    
    console.log('❌ No se encontró token válido en ninguna ubicación');
    return null;
  }



  /**
   * Obtener token de cookies con búsqueda optimizada
   */
  private getTokenFromCookies(): string | null {
    console.log('🍪 Revisando cookies disponibles...');
    
    for (const cookieName of this.POSSIBLE_COOKIE_NAMES) {
      const token = getCookie(cookieName);
      if (isValidToken(token)) {
        console.log(`✅ Token válido encontrado en cookie: ${cookieName}`);
        return token;
      }
    }
    
    console.log('❌ No se encontró token válido en ninguna cookie');
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