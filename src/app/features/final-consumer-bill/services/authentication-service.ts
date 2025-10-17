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

  async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      console.log('🔐 Iniciando sesión...');
      
      const loginData = { username, password };
      const response = await this.http.post<any>('https://accounts.beckysflorist.site/authentication/login', loginData).toPromise();
      
      if (response && response.token) {
        console.log('✅ Login exitoso');
        this.storeAuthData(response.token, response.user || { id: username, username });
        return { success: true, message: 'Sesión iniciada correctamente' };
      } else {
        return { success: false, message: 'Credenciales inválidas' };
      }
      
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      let message = 'Error al iniciar sesión';
      if (error.status === 401) {
        message = 'Credenciales incorrectas';
      }
      return { success: false, message };
    }
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

  // Métodos de compatibilidad
  getAuthToken(): string | null { return this.getToken(); }
  checkForLoginSuccess(): void { }
  async isAuthenticatedAsync(): Promise<boolean> { return this.isAuthenticated(); }
  async handleLoginReturn(): Promise<void> { }
  handleLoginCallback(): void { }
  startLoginMonitoring(): void { }
  redirectToLogin(): void { }
}