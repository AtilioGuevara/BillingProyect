import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrlHelperService {

  constructor() { }

  /**
   * Obtener la URL de callback según el entorno
   */
  getCallbackUrl(): string {
    const isLocal = this.isLocalEnvironment();
    return isLocal ? environment.auth.localCallbackUrl : environment.auth.callbackUrl;
  }

  /**
   * Verificar si estamos en entorno local
   */
  isLocalEnvironment(): boolean {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.port !== '';
  }

  /**
   * Obtener la URL base actual
   */
  getCurrentBaseUrl(): string {
    return `${window.location.protocol}//${window.location.host}`;
  }

  /**
   * Construir URL completa para redirección de login
   */
  buildLoginRedirectUrl(): string {
    const loginUrl = environment.auth.externalLoginUrl;
    const callbackUrl = this.getCallbackUrl();
    
    const params = new URLSearchParams({
      returnUrl: callbackUrl,
      clientId: 'billing-app',
      source: 'billing-system'
    });

    return `${loginUrl}?${params.toString()}`;
  }

  /**
   * Limpiar parámetros de la URL actual
   */
  cleanCurrentUrl(): void {
    const cleanUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    window.history.replaceState({}, document.title, cleanUrl);
  }
}