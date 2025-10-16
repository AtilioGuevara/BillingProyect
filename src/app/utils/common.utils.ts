/**
 * Utilidades comunes para la aplicación
 */

/**
 * Obtener cookie por nombre
 */
export function getCookie(name: string): string | null {
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
 * Obtener token de parámetros URL
 */
export function getTokenFromUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('token') || 
         urlParams.get('access_token') || 
         urlParams.get('authToken') || 
         urlParams.get('jwt');
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