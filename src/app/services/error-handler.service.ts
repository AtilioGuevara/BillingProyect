import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, retryWhen, mergeMap, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ErrorInfo {
  message: string;
  userMessage: string;
  shouldRetry: boolean;
  shouldRedirectToLogin: boolean;
}

/**
 * Servicio centralizado para manejo de errores HTTP
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // 1 segundo

  /**
   * Analizar error y determinar la acción apropiada
   */
  analyzeError(error: any): ErrorInfo {
    const errorInfo: ErrorInfo = {
      message: '',
      userMessage: '',
      shouldRetry: false,
      shouldRedirectToLogin: false
    };

    // Determinar tipo de error
    if (this.isNetworkError(error)) {
      errorInfo.message = 'Error de red';
      errorInfo.userMessage = 'Sin conexión a internet. Verifique su conexión.';
      errorInfo.shouldRetry = true;
    } else if (this.isAuthError(error)) {
      errorInfo.message = 'Error de autenticación';
      errorInfo.userMessage = 'Sesión expirada. Redirigiendo al login...';
      errorInfo.shouldRedirectToLogin = true;
    } else if (this.isServerError(error)) {
      errorInfo.message = 'Error del servidor';
      errorInfo.userMessage = 'Error interno del servidor. Intente más tarde.';
      errorInfo.shouldRetry = true;
    } else if (this.isNotFoundError(error)) {
      errorInfo.message = 'Recurso no encontrado';
      errorInfo.userMessage = 'Servicio no encontrado. Verifique la configuración.';
      errorInfo.shouldRetry = false;
    } else {
      errorInfo.message = 'Error desconocido';
      errorInfo.userMessage = 'Ha ocurrido un error inesperado. Intente nuevamente.';
      errorInfo.shouldRetry = false;
    }

    return errorInfo;
  }

  /**
   * Crear operador RxJS para manejo automático de errores
   */
  createErrorHandler<T>(customMessage?: string) {
    return (source: Observable<T>): Observable<T> => {
      return source.pipe(
        retryWhen(errors =>
          errors.pipe(
            mergeMap((error, index) => {
              const errorInfo = this.analyzeError(error);
              
              // Solo reintentar si es apropiado y no hemos excedido el límite
              if (errorInfo.shouldRetry && index < this.MAX_RETRIES) {
                console.log(`🔄 Reintentando... (${index + 1}/${this.MAX_RETRIES})`);
                return timer(this.RETRY_DELAY * (index + 1)); // Delay incremental
              }
              
              // Si no se debe reintentar o se agotaron los intentos, propagar el error
              return throwError(() => error);
            })
          )
        ),
        catchError((error) => {
          const errorInfo = this.analyzeError(error);
          
          // Log del error (solo en desarrollo)
          if (!environment.production) {
            console.error('❌ Error capturado por ErrorHandler:', {
              error,
              errorInfo,
              customMessage
            });
          }
          
          // Usar mensaje personalizado si se proporciona
          if (customMessage) {
            errorInfo.userMessage = customMessage;
          }
          
          // Retornar error con información procesada
          return throwError(() => ({ ...error, errorInfo }));
        })
      );
    };
  }

  /**
   * Manejar error de forma simple y mostrar mensaje al usuario
   */
  handleError(error: any, customMessage?: string): string {
    const errorInfo = this.analyzeError(error);
    
    if (!environment.production) {
      console.error('❌ Error:', error);
    }
    
    return customMessage || errorInfo.userMessage;
  }

  /**
   * Verificar si es error de red
   */
  private isNetworkError(error: any): boolean {
    return (
      !navigator.onLine ||
      error.name === 'NetworkError' ||
      error.message?.includes('NetworkError') ||
      error.status === 0 ||
      error.message?.includes('Failed to fetch')
    );
  }

  /**
   * Verificar si es error de autenticación
   */
  private isAuthError(error: any): boolean {
    return (
      error.status === 401 ||
      error.status === 403 ||
      error.message?.includes('401') ||
      error.message?.includes('403') ||
      error.message?.includes('Unauthorized') ||
      error.message?.includes('Forbidden')
    );
  }

  /**
   * Verificar si es error del servidor
   */
  private isServerError(error: any): boolean {
    return (
      error.status >= 500 ||
      error.message?.includes('500') ||
      error.message?.includes('502') ||
      error.message?.includes('503') ||
      error.message?.includes('504')
    );
  }

  /**
   * Verificar si es error de recurso no encontrado
   */
  private isNotFoundError(error: any): boolean {
    return (
      error.status === 404 ||
      error.message?.includes('404') ||
      error.message?.includes('Not Found')
    );
  }
}