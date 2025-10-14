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
    return !!this.getToken();
  }

  getToken(): string | null {
    // Primero intentar obtener de localStorage
    const localToken = localStorage.getItem('authToken');
    if (localToken) return localToken;
    
    // Luego intentar obtener de cookies
    return this.getCookie('token');
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
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