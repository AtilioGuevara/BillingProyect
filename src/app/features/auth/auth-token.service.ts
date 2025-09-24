import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    // Cargar token del localStorage al inicializar
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.tokenSubject.next(token);
      console.log('🔑 Token cargado desde localStorage');
    }
  }

  // Guardar token
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSubject.next(token);
    console.log('💾 Token guardado');
  }

  // Obtener token como Observable
  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  // Obtener token inmediatamente
  getTokenValue(): string | null {
    return this.tokenSubject.value;
  }

  // Eliminar token
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSubject.next(null);
    console.log('🗑️ Token eliminado');
  }

  // Verificar si hay token
  hasToken(): boolean {
    return this.tokenSubject.value !== null;
  }
}