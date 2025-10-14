import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthTestService {

  constructor() { 
    // Hacer métodos disponibles globalmente para testing
    (window as any).authTest = this;
  }

  /**
   * Test manual para verificar URLs de redirección
   */
  testRedirectUrls() {
    console.log('🧪 ===== TEST DE URLS DE AUTENTICACIÓN =====');
    
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const callbackUrl = isLocal ? environment.auth.localCallbackUrl : environment.auth.callbackUrl;
    const loginUrl = environment.auth.externalLoginUrl;
    
    console.log('🏠 Entorno detectado:', isLocal ? 'Local' : 'Producción');
    console.log('🌐 URL actual:', window.location.href);
    console.log('🔗 URL de login:', loginUrl);
    console.log('🔄 URL de callback:', callbackUrl);
    
    // Construir URL de redirección con parámetro 'redirect' según compañero
    const params = new URLSearchParams({
      redirect: callbackUrl, // Cambiado de 'returnUrl' a 'redirect'
      clientId: 'billing-app',
      source: 'billing-system'
    });
    
    const fullLoginUrl = `${loginUrl}?${params.toString()}`;
    console.log('🎯 URL completa que se enviará:', fullLoginUrl);
    
    // Verificar si las URLs son válidas
    try {
      new URL(loginUrl);
      console.log('✅ URL de login es válida');
    } catch {
      console.log('❌ URL de login NO es válida');
    }
    
    try {
      new URL(callbackUrl);
      console.log('✅ URL de callback es válida');
    } catch {
      console.log('❌ URL de callback NO es válida');
    }
    
    console.log('==========================================');
    
    return {
      loginUrl,
      callbackUrl,
      fullLoginUrl,
      environment: isLocal ? 'local' : 'production'
    };
  }

  /**
   * Test para simular callback con token
   */
  testCallbackWithToken(token: string = 'test-token-123') {
    console.log('🧪 ===== SIMULANDO CALLBACK CON TOKEN =====');
    
    const currentUrl = new URL(window.location.href);
    
    // Simular token en query params
    currentUrl.searchParams.set('token', token);
    
    console.log('🎯 URL simulada con token:', currentUrl.toString());
    
    // Cambiar la URL sin recargar
    window.history.replaceState({}, document.title, currentUrl.toString());
    
    console.log('✅ Token agregado a la URL. Refresca la página para probar el callback');
    
    return currentUrl.toString();
  }

  /**
   * Test para verificar cookies
   */
  testCookies() {
    console.log('🧪 ===== TEST DE COOKIES =====');
    
    console.log('🍪 Todas las cookies:', document.cookie);
    
    // Verificar cookies específicas
    const cookies = document.cookie.split(';').map(c => c.trim());
    
    cookies.forEach(cookie => {
      const [name, value] = cookie.split('=');
      console.log(`🍪 ${name}: ${value?.substring(0, 30)}${value?.length > 30 ? '...' : ''}`);
    });
    
    // Intentar crear una cookie de test
    document.cookie = 'auth-test=funcionando; path=/; SameSite=Lax';
    
    setTimeout(() => {
      const testCookie = this.getCookie('auth-test');
      console.log('🧪 Cookie de test:', testCookie ? '✅ FUNCIONA' : '❌ NO FUNCIONA');
    }, 100);
    
    console.log('================================');
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

  /**
   * Limpiar datos de test
   */
  clearTestData() {
    console.log('🧹 Limpiando datos de test...');
    
    localStorage.removeItem('auth_redirect_info');
    localStorage.removeItem('authToken');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'auth-test=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    console.log('✅ Datos de test limpiados');
  }

  /**
   * Información completa del entorno
   */
  getEnvironmentInfo() {
    return {
      hostname: window.location.hostname,
      href: window.location.href,
      userAgent: navigator.userAgent,
      cookies: document.cookie,
      localStorage: {
        authToken: localStorage.getItem('authToken'),
        redirectInfo: localStorage.getItem('auth_redirect_info')
      },
      environment: environment
    };
  }
}