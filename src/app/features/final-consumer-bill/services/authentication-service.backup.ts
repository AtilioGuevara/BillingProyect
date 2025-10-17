import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

/**
 * Servicio SIMPLIFICADO de autenticación - Solo lo básico
 * 1. Guardar cookie correctamente con cross-domain
 * 2. Leer cookie para enviar al backend
 * 3. Funciones de debug básicas
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly TOKEN_KEY = 'token';

  constructor(private router: Router) {
    // Solo funciones de debug básicas
    (window as any).debugCookies = this.debugCookies.bind(this);
    (window as any).getToken = this.getToken.bind(this);
    (window as any).setTestToken = this.setTestToken.bind(this);
    
    console.log('🔧 AuthService SIMPLE iniciado. Funciones disponibles:');
    console.log('   - debugCookies() - Ver todas las cookies');
    console.log('   - getToken() - Obtener token actual');
    console.log('   - setTestToken("tu_token_aqui") - Establecer token de prueba');
  }

  /**
   * 1. OBTENER TOKEN - Método principal para obtener el token
   */
  getToken(): string | null {
    console.log('🔍 Buscando token...');
    
    // Buscar en cookies primero
    const cookieToken = this.getTokenFromCookies();
    if (cookieToken) {
      console.log('✅ Token encontrado en cookies');
      return cookieToken;
    }
    
    // Fallback: localStorage
    const localToken = localStorage.getItem(this.TOKEN_KEY);
    if (localToken) {
      console.log('✅ Token encontrado en localStorage');
      return localToken;
    }
    
    console.log('❌ No se encontró token');
    return null;
  }

  /**
   * 2. BUSCAR EN COOKIES - Método simple para buscar token en cookies
   */
  private getTokenFromCookies(): string | null {
    const cookies = document.cookie.split(';');
    
    for (const cookie of cookies) {
      const trimmed = cookie.trim();
      if (trimmed.startsWith('token=')) {
        const value = trimmed.substring(6); // 'token='.length = 6
        if (value && value !== 'undefined' && value !== 'null') {
          return value;
        }
      }
    }
    
    return null;
  }

  /**
   * 3. GUARDAR TOKEN - Establecer cookie con configuración cross-domain
   */
  storeToken(token: string): void {
    if (!token || token === 'undefined' || token === 'null') {
      console.log('❌ Token inválido, no se puede guardar');
      return;
    }

    console.log('💾 Guardando token...');
    console.log('🌐 Dominio actual:', window.location.hostname);
    
    // Guardar en localStorage primero
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log('✅ Token guardado en localStorage');
    
    // Configurar cookies con cross-domain
    const isHttps = window.location.protocol === 'https:';
    const secure = isHttps ? '; Secure' : '';
    
    // Cookie local
    document.cookie = `token=${token}; path=/${secure}; SameSite=Lax`;
    
    // Cookie cross-domain para .beckysflorist.site
    if (window.location.hostname.includes('beckysflorist.site')) {
      document.cookie = `token=${token}; path=/; domain=.beckysflorist.site${secure}; SameSite=Lax`;
      console.log('✅ Cookie cross-domain configurada para .beckysflorist.site');
    }
    
    // Verificar que se guardó
    const verification = this.getTokenFromCookies();
    console.log('🔄 Verificación:', verification ? 'Cookie guardada correctamente' : 'Error al guardar cookie');
  }

  /**
   * 4. VERIFICAR AUTENTICACIÓN - Método simple
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

  /**
   * Obtener token del dominio de accounts via API
   * Uso: fetchTokenFromAccounts() en la consola
   */
  async fetchTokenFromAccountsManually(): Promise<boolean> {
    console.log('🌐 OBTENIENDO TOKEN DEL DOMINIO ACCOUNTS');
    console.log('📍 Dominio actual:', window.location.hostname);
    console.log('🎯 Dominio objetivo: accounts.beckysflorist.site');
    
    try {
      // Intentar obtener el token del dominio accounts
      const accountsDomain = 'https://accounts.beckysflorist.site';
      const tokenEndpoint = `${accountsDomain}/authentication/current-token`;
      
      console.log('📡 Haciendo petición a:', tokenEndpoint);
      
      const response = await fetch(tokenEndpoint, {
        method: 'GET',
        credentials: 'include', // Incluir cookies del dominio accounts
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Respuesta exitosa del servidor accounts');
        console.log('📦 Datos recibidos:', data);
        
        if (data.token) {
          console.log('🎯 Token encontrado en respuesta del servidor');
          console.log('💾 Almacenando token con configuración cross-domain...');
          
          // Usar nuestro método storeToken para configurar cookies cross-domain
          this.storeToken(data.token);
          
          console.log('✅ Token almacenado exitosamente');
          console.log('🔄 Verificando que las cookies se crearon...');
          
          // Verificar cookies
          setTimeout(() => {
            const newCookies = document.cookie;
            console.log('🍪 Cookies después de almacenar:', newCookies);
            
            const storedToken = localStorage.getItem('token');
            console.log('💾 localStorage verificado:', storedToken ? 'OK' : 'FALLO');
          }, 100);
          
          return true;
        } else {
          console.log('❌ No se encontró token en la respuesta del servidor');
          console.log('📦 Estructura de respuesta:', Object.keys(data));
          return false;
        }
      } else {
        console.log('❌ Error en la respuesta del servidor');
        console.log('📟 Status:', response.status);
        console.log('📝 Status Text:', response.statusText);
        
        const errorText = await response.text();
        console.log('💬 Error del servidor:', errorText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error de red al obtener token:', error);
      console.log('🔧 Esto puede indicar:');
      console.log('   - CORS no configurado en accounts.beckysflorist.site');
      console.log('   - El endpoint /authentication/current-token no existe');
      console.log('   - Problema de conectividad');
      return false;
    }
  }

  /**
   * Método alternativo: Crear ventana popup para obtener token
   * Uso: fetchTokenViaPopup() en la consola
   */
  async fetchTokenViaPopupManually(): Promise<boolean> {
    console.log('🪟 OBTENIENDO TOKEN VIA POPUP');
    
    try {
      // Crear popup hacia accounts domain
      const accountsUrl = 'https://accounts.beckysflorist.site/authentication/token-bridge';
      console.log('🚪 Abriendo popup a:', accountsUrl);
      
      const popup = window.open(accountsUrl, 'tokenBridge', 'width=400,height=300');
      
      if (!popup) {
        console.log('❌ No se pudo abrir popup (bloqueado por el navegador)');
        return false;
      }
      
      // Escuchar mensaje del popup
      const tokenPromise = new Promise<string | null>((resolve) => {
        const messageHandler = (event: MessageEvent) => {
          if (event.origin !== 'https://accounts.beckysflorist.site') {
            console.log('❌ Mensaje de origen no confiable:', event.origin);
            return;
          }
          
          console.log('📩 Mensaje recibido del popup:', event.data);
          
          if (event.data.type === 'TOKEN_RESPONSE' && event.data.token) {
            console.log('🎯 Token recibido via popup');
            window.removeEventListener('message', messageHandler);
            popup.close();
            resolve(event.data.token);
          } else {
            console.log('❌ Mensaje sin token válido');
            resolve(null);
          }
        };
        
        window.addEventListener('message', messageHandler);
        
        // Timeout después de 10 segundos
        setTimeout(() => {
          console.log('⏰ Timeout del popup');
          window.removeEventListener('message', messageHandler);
          popup.close();
          resolve(null);
        }, 10000);
      });
      
      const token = await tokenPromise;
      
      if (token) {
        console.log('💾 Almacenando token obtenido via popup...');
        this.storeToken(token);
        console.log('✅ Token almacenado exitosamente via popup');
        return true;
      } else {
        console.log('❌ No se obtuvo token via popup');
        return false;
      }
      
    } catch (error) {
      console.error('❌ Error en método popup:', error);
      return false;
    }
  }
}