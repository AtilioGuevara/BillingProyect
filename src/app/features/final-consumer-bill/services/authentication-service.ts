import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email?: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkInitialAuthState();
    
    (window as any).debugAuth = this.debugAuth.bind(this);
    console.log('🔧 AuthService iniciado');
  }

  /**
   * 🔄 LOGIN CON REDIRECCIÓN - Enviar solo dominio/path sin protocolo
   */
  loginWithRedirect(): void {
  console.log('🚀 Iniciando login con redirección...');
  
  // ✅ ENVIAR DOMINIO SIN PROTOCOLO - para evitar que el servidor añada https://
  const returnUrl = encodeURIComponent('https://bill.beckysflorist.site/final-consumer-bill/list');
  
  // URL de login con redirección automática de vuelta
  const loginUrl = `https://accounts.beckysflorist.site/login?redirect=${returnUrl}`;
  
  console.log('🔗 Return URL (sin protocolo):', 'bill.beckysflorist.site/final-consumer-bill/list');
  console.log('🔗 Return URL encoded:', returnUrl);
  console.log('🔗 Login URL completa:', loginUrl);
  
  // Redireccionar al sistema de autenticación externo
  window.location.href = loginUrl;
} 

  logout(): void {
    console.log('🚪 Cerrando sesión...');
    
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    if (window.location.hostname.includes('beckysflorist.site')) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.beckysflorist.site;';
    }
    
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
    
    console.log('✅ Sesión cerrada');
  }

  getToken(): string | null {
    const cookieToken = this.getTokenFromCookies();
    if (cookieToken) return cookieToken;
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  private storeAuthData(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    
    const isHttps = window.location.protocol === 'https:';
    const secure = isHttps ? '; Secure' : '';
    
    document.cookie = `token=${token}; path=/${secure}; SameSite=Lax`;
    
    if (window.location.hostname.includes('beckysflorist.site')) {
      document.cookie = `token=${token}; path=/; domain=.beckysflorist.site${secure}; SameSite=Lax`;
    }
    
    this.isLoggedInSubject.next(true);
    this.currentUserSubject.next(user);
  }

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

  private checkInitialAuthState(): void {
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    if (token && user) {
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next(user);
    } else {
      this.isLoggedInSubject.next(false);
      this.currentUserSubject.next(null);
    }
  }

  debugAuth(): void {
    console.log('🔍 === DEBUG DE AUTENTICACIÓN ===');
    console.log('🔑 Token:', this.getToken());
    console.log('👤 Usuario:', this.getCurrentUser());
    console.log('✅ Autenticado:', this.isAuthenticated());
  }

  // Método para compatibilidad con auth-callback.component.ts
  storeToken(token: string): void {
    if (!token || token === 'undefined' || token === 'null') {
      console.log('❌ Token inválido');
      return;
    }

    // Crear un usuario básico si no tenemos información del usuario
    const basicUser: User = {
      id: 'user_' + Date.now(),
      username: 'Usuario'
    };

    this.storeAuthData(token, basicUser);
    console.log('✅ Token almacenado desde auth-callback');
  }

  // Método para compatibilidad con auth-callback.component.ts
  redirectToLogin(): void {
    console.log('🚀 Redirigiendo al login (desde callback)...');
    
    // Limpiar datos de autenticación
    this.logout();
    
    // Usar el nuevo método de redirección
    this.loginWithRedirect();
  }

  // Métodos de compatibilidad
  getAuthToken(): string | null { return this.getToken(); }
  
  /**
   * ✅ VALIDACIÓN DE SESIÓN - Usando nueva IP de validación
   */
  async validateSession(): Promise<boolean> {
    try {
      console.log('🔍 Validando sesión con servidor...');
      
      const token = this.getToken();
      if (!token) {
        console.log('❌ No hay token para validar');
        return false;
      }

      // ✅ NUEVA URL DE VALIDACIÓN con IP específica
      const validationUrl = 'http://173.249.17.80/api/auth/authentication/validate';
      
      const response = await this.http.post<any>(validationUrl, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).toPromise();

      if (response && response.valid) {
        console.log('✅ Sesión válida confirmada por servidor');
        return true;
      } else {
        console.log('❌ Sesión no válida según servidor');
        return false;
      }
    } catch (error) {
      console.error('❌ Error validando sesión:', error);
      return false;
    }
  }
  
  checkForLoginSuccess(): void { 
    // Ejecutar validación de sesión automáticamente
    this.validateSession().then(isValid => {
      if (isValid) {
        console.log('✅ Sesión automática válida');
      } else {
        console.log('❌ Sesión automática no válida');
      }
    });
  }
  
  async isAuthenticatedAsync(): Promise<boolean> { return this.isAuthenticated(); }
  async handleLoginReturn(): Promise<void> { }
  handleLoginCallback(): void { }
  startLoginMonitoring(): void { }
}