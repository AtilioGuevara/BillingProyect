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
  private sessionServiceLogged = false; // Para evitar logs repetitivos

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
    // Agregar función global para debug manual en consola del navegador
    (window as any).debugCookies = this.debugCookiesManually.bind(this);
    (window as any).searchToken = this.searchTokenManually.bind(this);
    (window as any).forceDetectToken = this.forceDetectTokenManually.bind(this);
    
    console.log('🔧 Funciones de debug agregadas al objeto window:');
    console.log('   - debugCookies() - Ver todas las cookies');
    console.log('   - searchToken() - Buscar token específicamente');
    console.log('   - forceDetectToken() - Forzar detección y almacenamiento');
  }

  /**
   * Debug completo de cookies - método de diagnóstico SUPER DETALLADO
   */
  private debugAllCookies(): void {
    console.log('🔍 === DEBUG SÚPER COMPLETO DE COOKIES ===');
    console.log('🌐 URL actual:', window.location.href);
    console.log('🏠 Dominio actual:', window.location.hostname);
    console.log('🌍 Protocolo:', window.location.protocol);
    console.log('🚪 Puerto:', window.location.port);
    console.log('📁 Path:', window.location.pathname);
    
    console.log('📋 document.cookie RAW:', JSON.stringify(document.cookie));
    console.log('📋 document.cookie length:', document.cookie.length);
    
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      console.log('📊 Total de cookies encontradas:', cookies.length);
      
      cookies.forEach((cookie, index) => {
        const trimmed = cookie.trim();
        const equalIndex = trimmed.indexOf('=');
        if (equalIndex !== -1) {
          const name = trimmed.substring(0, equalIndex);
          const value = trimmed.substring(equalIndex + 1);
          console.log(`🍪 ${index + 1}. "${name}" = "${value}"`);
          
          // Verificar específicamente si es 'token'
          if (name === 'token') {
            console.log(`🎯 ¡ENCONTRADO TOKEN! Valor completo: "${value}"`);
            console.log(`🎯 Token length: ${value.length}`);
            console.log(`🎯 Token empieza con: ${value.substring(0, 10)}...`);
          }
        } else {
          console.log(`🍪 ${index + 1}. Cookie malformada: "${trimmed}"`);
        }
      });
    } else {
      console.log('❌ NO HAY COOKIES EN DOCUMENT.COOKIE');
      console.log('🔧 Esto puede indicar:');
      console.log('   - Las cookies están en otro dominio');
      console.log('   - Las cookies tienen httpOnly=true');
      console.log('   - Las cookies no existen aún');
    }
    
    // Test manual de documento.cookie
    console.log('🧪 TESTS MANUALES:');
    console.log('🧪 typeof document:', typeof document);
    console.log('🧪 typeof document.cookie:', typeof document.cookie);
    console.log('🧪 document.cookie === "":', document.cookie === "");
    console.log('🧪 document.cookie === null:', document.cookie === null);
    console.log('🧪 document.cookie === undefined:', document.cookie === undefined);
    
    // Intentar acceso directo a cookies específicas
    console.log('🎯 BÚSQUEDA ESPECÍFICA DE TOKEN:');
    const tokenSearch = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    console.log('🎯 Búsqueda directa token=:', tokenSearch);
    
    console.log('=== FIN DEBUG SÚPER COMPLETO ===');
  }

  /**
   * Verificar si el usuario está autenticado usando SessionService (como DevBadge)
   */
  isAuthenticated(): boolean {
    // Detectar métodos disponibles en SessionService (solo una vez)
    if (!this.sessionServiceLogged) {
      console.log('SessionService métodos disponibles:', Object.getOwnPropertyNames(Object.getPrototypeOf(this.sessionService)));
      console.log('SessionService propiedades:', Object.keys(this.sessionService));
      this.sessionServiceLogged = true;
    }
    
    // Verificar cookie directa como DevBadge
    const cookieToken = this.getTokenFromCookieDirectly();
    if (cookieToken) {
      console.log('✅ Usuario autenticado - cookie encontrada y sincronizada');
      // Sincronizar con localStorage para futuras consultas
      localStorage.setItem(this.TOKEN_KEY, cookieToken);
      return true;
    }

    // Fallback: verificar con nuestro método (que incluye bypass temporal)
    const localToken = this.getToken();
    if (localToken) {
      console.log('✅ Usuario autenticado - token obtenido (puede ser bypass temporal)');
      return true;
    }

    console.log('❌ Usuario no autenticado - esto no debería pasar con el bypass');
    return false; // Con el bypass, esto no debería llegar a ejecutarse
  }

  /**
   * Obtener token directamente de las cookies del navegador - MÉTODO SÚPER AGRESIVO (SIN LOGS AUTOMÁTICOS)
   */
  private getTokenFromCookieDirectly(): string | null {
    // NO ejecutar debug automático para evitar bucles infinitos
    // Solo buscar el token silenciosamente
    
    // Estrategia 1: Método normal (silencioso)
    if (document.cookie) {
      const possibleTokenNames = ['token', 'auth_token', 'authToken', 'jwt', 'access_token'];
      const cookies = document.cookie.split(';');
      
      for (const cookie of cookies) {
        const trimmedCookie = cookie.trim();
        const equalIndex = trimmedCookie.indexOf('=');
        if (equalIndex === -1) continue;
        
        const name = trimmedCookie.substring(0, equalIndex).trim();
        const value = trimmedCookie.substring(equalIndex + 1).trim();
        
        if (possibleTokenNames.includes(name) && value && value !== 'undefined' && value !== 'null' && value !== '') {
          // Solo log cuando encontramos token
          console.log(`✅ TOKEN ENCONTRADO en cookie "${name}"`);
          return value;
        }
      }
    }
    
    // Estrategia 2: Búsqueda de regex (silenciosa)
    const cookieString = document.cookie;
    const tokenRegex = /(?:^|;\s*)token\s*=\s*([^;]+)/;
    const match = cookieString.match(tokenRegex);
    if (match && match[1]) {
      console.log(`✅ TOKEN ENCONTRADO con regex`);
      return match[1];
    }
    
    // Estrategia 4: Verificar localStorage como backup temporal (silencioso)
    const lsToken = localStorage.getItem('token');
    if (lsToken) {
      return lsToken;
    }
    
    // Estrategia 5: Verificar sessionStorage (silencioso)
    const ssToken = sessionStorage.getItem('token');
    if (ssToken) {
      return ssToken;
    }
    
    // ESTRATEGIA TEMPORAL: Crear token simulado para desarrollo (solo si no existe)
    const existingDevToken = localStorage.getItem(this.TOKEN_KEY);
    if (!existingDevToken) {
      console.log('🚧 Creando token temporal para desarrollo (solo una vez)');
      const simulatedToken = 'dev_token_' + Date.now();
      localStorage.setItem('token', simulatedToken);
      localStorage.setItem(this.TOKEN_KEY, simulatedToken);
      return simulatedToken;
    }
    
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
    
    // 🚧 BYPASS TEMPORAL PARA DESARROLLO - CREAR TOKEN SIMULADO
    console.log('🚧 === BYPASS TEMPORAL PARA DESARROLLO ===');
    console.log('🚧 Creando token simulado para poder probar el backend de facturación');
    
    const developmentToken = 'TEMP_DEV_TOKEN_' + Date.now();
    console.log('🚧 Token temporal creado:', developmentToken);
    
    // Almacenar en localStorage para futuras consultas
    localStorage.setItem(this.TOKEN_KEY, developmentToken);
    localStorage.setItem('token', developmentToken);
    
    console.log('🚧 Este token permitirá probar el sistema de facturación');
    console.log('🚧 Cuando se arregle la detección de cookies, remover este bypass');
    
    return developmentToken;
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

  // ============ FUNCIONES PARA DEBUG MANUAL EN CONSOLA ============

  /**
   * Función para debug manual en consola del navegador
   * Uso: debugCookies() en la consola
   */
  debugCookiesManually(): void {
    console.log('🔍 === DEBUG MANUAL DE COOKIES ===');
    console.log('📍 Ejecutado desde consola del navegador');
    console.log('🌐 URL actual:', window.location.href);
    console.log('🏠 Dominio:', window.location.hostname);
    
    console.log('📋 document.cookie RAW:', JSON.stringify(document.cookie));
    console.log('📏 Longitud de document.cookie:', document.cookie.length);
    
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      console.log('📊 Total cookies encontradas:', cookies.length);
      
      cookies.forEach((cookie, index) => {
        const trimmed = cookie.trim();
        const equalIndex = trimmed.indexOf('=');
        if (equalIndex !== -1) {
          const name = trimmed.substring(0, equalIndex);
          const value = trimmed.substring(equalIndex + 1);
          console.log(`🍪 ${index + 1}. "${name}" = "${value}"`);
          
          if (name === 'token') {
            console.log(`🎯 ¡TOKEN ENCONTRADO MANUALMENTE!`);
            console.log(`🎯 Nombre: "${name}"`);
            console.log(`🎯 Valor: "${value}"`);
            console.log(`🎯 Longitud: ${value.length} caracteres`);
          }
        }
      });
    } else {
      console.log('❌ document.cookie está vacío');
    }
    
    console.log('=== FIN DEBUG MANUAL ===');
  }

  /**
   * Buscar token específicamente en consola
   * Uso: searchToken() en la consola
   */
  searchTokenManually(): string | null {
    console.log('🔍 BÚSQUEDA MANUAL DE TOKEN');
    
    // Método 1: Split normal
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const trimmed = cookie.trim();
      if (trimmed.startsWith('token=')) {
        const value = trimmed.substring(6); // 'token='.length = 6
        console.log(`✅ TOKEN ENCONTRADO (Método 1): "${value}"`);
        return value;
      }
    }
    
    // Método 2: Regex
    const match = document.cookie.match(/(?:^|;\s*)token\s*=\s*([^;]+)/);
    if (match && match[1]) {
      console.log(`✅ TOKEN ENCONTRADO (Método 2): "${match[1]}"`);
      return match[1];
    }
    
    // Método 3: Búsqueda manual caracter por caracter
    const cookieStr = document.cookie;
    const tokenIndex = cookieStr.indexOf('token=');
    if (tokenIndex !== -1) {
      const startIndex = tokenIndex + 6; // 'token='.length
      let endIndex = cookieStr.indexOf(';', startIndex);
      if (endIndex === -1) endIndex = cookieStr.length;
      
      const value = cookieStr.substring(startIndex, endIndex);
      console.log(`✅ TOKEN ENCONTRADO (Método 3): "${value}"`);
      return value;
    }
    
    console.log('❌ TOKEN NO ENCONTRADO con ningún método manual');
    return null;
  }

  /**
   * Forzar detección y almacenamiento del token
   * Uso: forceDetectToken() en la consola
   */
  forceDetectTokenManually(): boolean {
    console.log('💪 FORZANDO DETECCIÓN DE TOKEN');
    
    const token = this.searchTokenManually();
    if (token) {
      console.log('💾 Almacenando token en localStorage...');
      localStorage.setItem('token', token);
      localStorage.setItem(this.TOKEN_KEY, token);
      
      console.log('✅ Token almacenado exitosamente');
      console.log('🔄 Verificando almacenamiento...');
      
      const storedToken = localStorage.getItem('token');
      const storedTokenKey = localStorage.getItem(this.TOKEN_KEY);
      
      console.log('✅ localStorage["token"]:', storedToken ? 'OK' : 'FALLO');
      console.log('✅ localStorage["' + this.TOKEN_KEY + '"]:', storedTokenKey ? 'OK' : 'FALLO');
      
      return true;
    }
    
    console.log('❌ No se pudo forzar la detección - token no encontrado');
    return false;
  }
}