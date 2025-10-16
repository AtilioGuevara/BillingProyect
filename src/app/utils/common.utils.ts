/**
 * Utilidades comunes para la aplicación
 */

/**
 * Obtener cookie por nombre con logging mejorado
 */
export function getCookie(name: string): string | null {
  console.log(`🍪 Buscando cookie: ${name}`);
  console.log(`🍪 Cookies disponibles: ${document.cookie}`);
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const value = c.substring(nameEQ.length, c.length);
      console.log(`✅ Cookie ${name} encontrada: ${value ? `${value.substring(0, 20)}...` : 'vacía'}`);
      return value && value !== 'undefined' && value !== 'null' ? value : null;
    }
  }
  
  console.log(`❌ Cookie ${name} no encontrada`);
  return null;
}

/**
 * Validar si un token es válido
 */
export function isValidToken(token: string | null): boolean {
  return !!(token && token !== 'null' && token !== 'undefined' && token.length > 10);
}

/**
 * Limpiar URL de parámetros sensibles
 */
export function cleanUrlFromToken(): void {
  const cleanUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  window.history.replaceState({}, document.title, cleanUrl);
}

/**
 * Obtener token de parámetros URL con logging mejorado
 */
export function getTokenFromUrl(): string | null {
  console.log('🔍 Buscando token en URL...');
  console.log('📍 URL completa:', window.location.href);
  console.log('🔗 Query string:', window.location.search);
  
  const urlParams = new URLSearchParams(window.location.search);
  
  // Intentar múltiples nombres de parámetro
  const possibleParams = ['token', 'access_token', 'authToken', 'jwt', 'auth', 'authorization'];
  
  for (const param of possibleParams) {
    const value = urlParams.get(param);
    if (value) {
      console.log(`✅ Token encontrado en parámetro '${param}': ${value.substring(0, 20)}...`);
      return value;
    }
  }
  
  // También buscar en el hash (por si viene como fragment)
  const hash = window.location.hash.substring(1);
  if (hash) {
    console.log('🔍 Revisando hash:', hash);
    const hashParams = new URLSearchParams(hash);
    for (const param of possibleParams) {
      const value = hashParams.get(param);
      if (value) {
        console.log(`✅ Token encontrado en hash '${param}': ${value.substring(0, 20)}...`);
        return value;
      }
    }
  }
  
  console.log('❌ No se encontró token en la URL');
  return null;
}

/**
 * Formatear fecha para mostrar
 */
export function formatDate(date: string | Date): string {
  if (!date) return 'No disponible';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return 'Fecha inválida';
  
  return dateObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Validar si el usuario está en línea
 */
export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Determinar si estamos en entorno local
 */
export function isLocalEnvironment(): boolean {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname.includes('localhost');
}

/**
 * Generar ID único simple
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Debounce para optimizar búsquedas
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}