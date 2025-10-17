import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { getCookie, isValidToken, getTokenFromUrl, cleanUrlFromToken, isLocalEnvironment } from '../../../utils/common.utils';
import { SessionService } from 'colibrihub-shared-services';

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
  ];

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {}

  /**
   * Debug completo de cookies - método de diagnóstico
   */
  private debugAllCookies(): void {
    console.log('🔍 === DEBUG COMPLETO DE COOKIES ===');
    console.log('🌐 URL actual:', window.location.href);
    console.log('🏠 Dominio actual:', window.location.hostname);
    console.log('📋 document.cookie completo:', document.cookie);
    
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      console.log('📊 Total de cookies:', cookies.length);
      
      cookies.forEach((cookie, index) => {
        const trimmed = cookie.trim();
        const [name, value] = trimmed.split('=');
        console.log(`🍪 ${index + 1}. "${name}" = "${value || '(vacío)'}"`);
      });
    } else {
      console.log('❌ NO HAY COOKIES EN DOCUMENT.COOKIE');
    }
    console.log('=================================');
  }

  /**
   * Verificar si el usuario está autenticado usando SessionService (como DevBadge)
   */
  isAuthenticated(): boolean {
    // Debug completo de cookies primero
    this.debugAllCookies();
    
    // Detectar métodos disponibles en SessionService
    console.log('SessionService métodos disponibles:', Object.getOwnPropertyNames(Object.getPrototypeOf(this.sessionService)));
    console.log('SessionService propiedades:', Object.keys(this.sessionService));
    
    // Intentar detectar token directamente de la cookie como DevBadge
    const cookieToken = this.getTokenFromCookieDirectly();
    if (cookieToken) {
      console.log('Token encontrado directamente de cookie:', cookieToken.substring(0, 20) + '...');
      // Sincronizar con localStorage
      localStorage.setItem(this.TOKEN_KEY, cookieToken);
      return true;
    }

    // Fallback: verificar con nuestro método
    const localToken = this.getToken();
    if (localToken) {
      console.log('Token encontrado via método local:', localToken.substring(0, 20) + '...');
      return true;
    }

    console.log('No se encontró token en ninguna ubicación');
    return false;
  }

  /**
   * Obtener token directamente de las cookies del navegador - MÉTODO DIRECTO
   */
  private getTokenFromCookieDirectly(): string | null {
    console.log('🍪 === ACCESO DIRECTO A COOKIES DEL NAVEGADOR ===');
    console.log('📋 Todas las cookies:', document.cookie);
    
    if (!document.cookie) {
      console.log('❌ No hay cookies en document.cookie');
      return null;
    }
    
    // Buscar múltiples nombres de cookie posibles
    const possibleTokenNames = ['token', 'auth_token', 'authToken', 'jwt', 'access_token'];
    
    const cookies = document.cookie.split(';');
    console.log('🔍 Cookies individuales:', cookies);
    
    for (const cookie of cookies) {
      const trimmedCookie = cookie.trim();
      console.log('🔎 Analizando cookie:', trimmedCookie);
      
      const equalIndex = trimmedCookie.indexOf('=');
      if (equalIndex === -1) continue;
      
      const name = trimmedCookie.substring(0, equalIndex).trim();
      const value = trimmedCookie.substring(equalIndex + 1).trim();
      
      console.log(`📝 Cookie encontrada: ${name} = ${value.substring(0, 20)}${value.length > 20 ? '...' : ''}`);
      
      if (possibleTokenNames.includes(name) && value && value !== 'undefined' && value !== 'null' && value !== '') {
        console.log(`✅ TOKEN ENCONTRADO en cookie "${name}":`, value.substring(0, 30) + '...');
        return value;
      }
    }
    
    console.log('❌ No se encontró token en ninguna cookie');
    return null;
  }

  /**
   * Verificar autenticación incluyendo validación de sesión
   */
  async isAuthenticatedAsync(): Promise<boolean> {
    // Primero intentar detección directa como DevBadge
    if (this.isAuthenticated()) {
      return true;
    }
    
    // Si no hay token local, validar sesión con backend (solo si endpoint existe)
    console.log('Intentando validación de sesión con backend...');
    try {
      const isSessionValid = await this.validateSession();
      if (isSessionValid) {
        // Si la sesión es válida, intentar obtener token de cookies nuevamente
        const cookieToken = this.getTokenFromCookieDirectly();
        if (cookieToken) {
          localStorage.setItem(this.TOKEN_KEY, cookieToken);
          return true;
        } else {
          // Crear token temporal si la sesión es válida
          const tempToken = 'session_valid_' + Date.now();
          localStorage.setItem(this.TOKEN_KEY, tempToken);
          return true;
        }
      }
    } catch (error) {
      console.log('Validación de sesión falló (probablemente CORS):', error);
      // Ignorar error de CORS y continuar con lógica local
    }
    
    return false;
  }

  /**
   * Obtener token de autenticación desde múltiples fuentes con debug mejorado
   */
  getToken(): string | null {
    console.log('🔍 Buscando token de autenticación (método DevBadge)...');
    
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

    // 3. Cookie directa (método DevBadge) - PRIORIDAD
    const cookieToken = this.getTokenFromCookieDirectly();
    if (isValidToken(cookieToken)) {
      console.log('✅ Token válido encontrado en cookie directa, sincronizando con localStorage');
      localStorage.setItem(this.TOKEN_KEY, cookieToken!);
      return cookieToken;
    }
    
    // 4. URL Parameters (para retorno del login)
    const urlToken = getTokenFromUrl();
    if (isValidToken(urlToken)) {
      console.log('✅ Token válido encontrado en URL');
      this.storeToken(urlToken!);
      cleanUrlFromToken();
      return urlToken;
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
    console.log('Revisando cookies disponibles...');
    
    for (const cookieName of this.POSSIBLE_COOKIE_NAMES) {
      const token = getCookie(cookieName);
      if (isValidToken(token)) {
        console.log(`Token válido encontrado en cookie: ${cookieName}`);
        return token;
      }
    }
    
    console.log('No se encontró token válido en ninguna cookie');
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
    console.log('Token guardado en localStorage');
    
    // Configurar cookies
    const isHttps = window.location.protocol === 'https:';
    const secure = isHttps ? '; Secure' : '';
    
    // Cookies para dominio actual
    document.cookie = `token=${token}; path=/${secure}; SameSite=Lax`;
    document.cookie = `authToken=${token}; path=/${secure}; SameSite=Lax`;
    console.log('Cookies locales establecidas');
    
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
      console.log('Cookies de subdominio establecidas para .beckysflorist.site');
    }
    
    // Verificar que las cookies se establecieron
    console.log('Cookies después de guardar:', document.cookie);
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
    console.log('Marcado como esperando autenticación');
    
    // Redirigir
    console.log('Redirigiendo a sistema de autenticación externo...');
    window.location.href = loginUrl;
  }

  /**
   * Validar sesión con el backend
   */
  async validateSession(): Promise<boolean> {
    console.log('Validando sesión con el backend...');

    try {
      const response = await fetch(`${environment.auth.externalLoginUrl.replace('/login', '')}/authentication/validate`, {
        method: 'GET',
        credentials: 'include', // Enviar cookies automáticamente
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log('Sesión validada exitosamente');
        return true;
      } else {
        console.log('Sesión no válida - Status:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error de red al validar sesión:', error);
      return false;
    }
  }

  /**
   * Procesar retorno del login externo con validación de sesión
   */
  async handleLoginReturn(): Promise<void> {
    console.log('Procesando retorno del login externo...');
    console.log('URL actual:', window.location.href);
    
    const token = getTokenFromUrl();
    console.log('Token extraído de URL:', token ? `${token.substring(0, 20)}...` : 'No encontrado');
    
    if (token) {
      console.log('Token encontrado, almacenando...');
      this.storeToken(token);
      cleanUrlFromToken();
      localStorage.removeItem('waitingForAuth');
      console.log('Autenticación completada exitosamente');
    } else {
      console.log('No se encontró token en la URL, validando sesión con backend...');
      
      // Validar sesión con el backend
      const isSessionValid = await this.validateSession();
      
      if (isSessionValid) {
        console.log('Sesión validada, buscando token en cookies...');
        
        // Verificar si hay token en cookies después de login
        const cookieToken = this.getTokenFromCookies();
        if (cookieToken) {
          console.log('Token encontrado en cookies, almacenando...');
          this.storeToken(cookieToken);
          localStorage.removeItem('waitingForAuth');
          console.log('Autenticación completada desde cookies');
        } else {
          console.log('Sesión válida pero no se encontró token, creando token temporal...');
          // Si la sesión es válida pero no hay token, crear uno temporal
          const tempToken = 'session_valid_' + Date.now();
          localStorage.setItem(this.TOKEN_KEY, tempToken);
          localStorage.removeItem('waitingForAuth');
        }
      } else {
        console.log('Sesión no válida, limpiando estado...');
        localStorage.removeItem('waitingForAuth');
        // No redirigir automáticamente aquí, dejar que el componente maneje el error
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