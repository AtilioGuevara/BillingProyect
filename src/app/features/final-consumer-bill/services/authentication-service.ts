import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  constructor() {
    console.log('🔧 AuthService iniciado - solo manejo de token');
  }

  /**
   * LOGIN CON REDIRECCIÓN - CORREGIDO: URL sin duplicar protocolo
   */
  loginWithRedirect(): void {
    console.log('🚀 Iniciando login con redirección...');
    
    // URL de retorno SIN protocolo duplicado
    const returnUrl = encodeURIComponent('bill.beckysflorist.site/final-consumer-bill/list');
    const loginUrl = `https://accounts.beckysflorist.site/login?redirect=${returnUrl}`;
    
    console.log('🔗 Login URL completa:', loginUrl);
    console.log('📍 Return URL:', returnUrl);
    window.location.href = loginUrl;
  }

  /**
   * LOGOUT - Solo limpiar token
   */
  logout(): void {
    console.log('🚪 Cerrando sesión...');
    localStorage.removeItem(this.TOKEN_KEY);
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    if (window.location.hostname.includes('beckysflorist.site')) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.beckysflorist.site;';
    }
    
    console.log('✅ Token eliminado');
  }

  /**
   * OBTENER TOKEN - Desde localStorage o cookies
   */
  getToken(): string | null {
    // Primero intentar desde cookies
    const cookieToken = this.getTokenFromCookies();
    if (cookieToken) return cookieToken;
    
    // Si no hay en cookies, intentar desde localStorage
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * ALMACENAR TOKEN - Sin validaciones
   */
  storeToken(token: string): void {
    if (!token || token === 'undefined' || token === 'null') {
      console.log('❌ Token inválido');
      return;
    }

    localStorage.setItem(this.TOKEN_KEY, token);
    const isHttps = window.location.protocol === 'https:';
    const secure = isHttps ? '; Secure' : '';
    document.cookie = `token=${token}; path=/; SameSite=Lax${secure}`;
    
    if (window.location.hostname.includes('beckysflorist.site')) {
      document.cookie = `token=${token}; path=/; domain=.beckysflorist.site${secure}; SameSite=Lax`;
    }

    console.log('✅ Token almacenado');
  }

  /**
   * REDIRIGIR AL LOGIN
   */
  redirectToLogin(): void {
    console.log('🚀 Redirigiendo al login...');
    this.logout();
    this.loginWithRedirect();
  }

  /**
   * OBTENER TOKEN DESDE COOKIES
   */
  private getTokenFromCookies(): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const trimmed = cookie.trim();
      if (trimmed.startsWith('token=')) {
        const value = trimmed.substring(6);
        if (value && value !== 'undefined' && value !== 'null') {
          return value;
        }
      }
    }
    return null;
  }
}