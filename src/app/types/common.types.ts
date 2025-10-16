import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Clase base para componentes con gestión automática de suscripciones
 */
@Injectable()
export abstract class BaseComponent implements OnDestroy {
  protected destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

/**
 * Tipos más estrictos para la aplicación
 */
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export interface ErrorResponse {
  error: {
    message: string;
    status: number;
    details?: any;
  };
  errorInfo?: {
    message: string;
    userMessage: string;
    shouldRetry: boolean;
    shouldRedirectToLogin: boolean;
  };
}

/**
 * Estados de carga para componentes
 */
export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface ComponentState {
  loadingState: LoadingState;
  error: string | null;
  data: any;
}

/**
 * Configuración de autenticación
 */
export interface AuthConfig {
  externalLoginUrl: string;
  callbackUrl: string;
  localCallbackUrl: string;
}

/**
 * Configuración de API
 */
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
}

/**
 * Tipo para headers HTTP
 */
export type HttpHeaders = Record<string, string>;

/**
 * Opciones para requests HTTP
 */
export interface RequestOptions {
  headers?: HttpHeaders;
  timeout?: number;
  withCredentials?: boolean;
  retry?: number;
}

/**
 * Guard type para validar tokens
 */
export type AuthToken = string & { readonly brand: unique symbol };

/**
 * Función para crear AuthToken validado
 */
export function createAuthToken(token: string): AuthToken | null {
  if (token && token !== 'null' && token !== 'undefined' && token.length > 10) {
    return token as AuthToken;
  }
  return null;
}