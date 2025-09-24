import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthTokenService } from './auth-token.service';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;    // Mensaje del backend
  token: string;      // Token JWT del backend (siempre presente en login exitoso)
  user?: SimpleUserDto;
}

export interface SimpleUserDto {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MessageDto {
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.authApiUrl;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
  };

  constructor(
    private http: HttpClient,
    private authTokenService: AuthTokenService
  ) {
    console.log('🔐 AuthService configurado para:', this.apiUrl);
    // Verificar si hay token al inicializar
    this.initializeAuthState();
  }

  // Inicializar estado de autenticación
  private initializeAuthState(): void {
    if (this.authTokenService.hasToken()) {
      console.log('🔍 Token encontrado, validando con el servidor...');
      // Validar token con el servidor usando el endpoint /validation/header
      this.validateByHeader().subscribe({
        next: (user) => {
          console.log('✅ Token válido, usuario autenticado:', user);
        },
        error: (error) => {
          console.warn('⚠️ Token inválido, limpiando estado:', error);
          this.authTokenService.clearToken();
          this.isLoggedInSubject.next(false);
        }
      });
    } else {
      this.isLoggedInSubject.next(false);
    }
  }

  // POST: Login con JWT Token (confirmado que funciona con POST)
  login(credentials: LoginRequest): Observable<LoginResponse> {
    const url = `${this.apiUrl}${environment.endpoints.auth.login}`;
    console.log('🔑 === INICIANDO LOGIN (POST confirmado) ===');
    console.log('🔑 URL completa:', url);
    console.log('🔑 Credenciales:', { username: credentials.username, password: '***' });
    console.log('🔑 Headers:', this.httpOptions.headers);
    
    return this.http.post<LoginResponse>(url, credentials, this.httpOptions).pipe(
      tap((response) => {
        console.log('🔑 === RESPUESTA DEL LOGIN ===');
        console.log('🔑 Response completa:', response);
        
        if (response.token) {
          this.authTokenService.setToken(response.token);
          this.isLoggedInSubject.next(true);
          console.log('✅ Login exitoso:', response.message);
        } else {
          console.error('❌ Login fallido - no hay token:', response.message);
        }
      }),
      catchError((error) => {
        console.log('🔑 === ERROR EN LOGIN ===');
        console.error('❌ Status:', error.status);
        console.error('❌ Status Text:', error.statusText);
        console.error('❌ URL:', error.url);
        console.error('❌ Error completo:', error);
        console.error('❌ Body del error:', error.error);
        
        // Si falla con el proxy, intentar URL directa como fallback
        if (error.status === 404 || error.status === 405) {
          console.log('🔧 === INTENTANDO URL DIRECTA COMO FALLBACK ===');
          const directUrl = 'https://donpollo123.duckdns.org/api/auth/authentication/login';
          console.log('🌐 Probando URL directa:', directUrl);
          
          // Crear headers específicos para el request directo
          const directHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          });
          
          return this.http.post<LoginResponse>(directUrl, credentials, { headers: directHeaders }).pipe(
            tap((directResponse) => {
              console.log('🎉 === LOGIN DIRECTO EXITOSO ===');
              console.log('🎉 Response directa:', directResponse);
              
              if (directResponse.token) {
                this.authTokenService.setToken(directResponse.token);
                this.isLoggedInSubject.next(true);
                console.log('✅ Login directo exitoso:', directResponse.message);
              }
            }),
            catchError((directError) => {
              console.log('❌ === FALLBACK TAMBIÉN FALLÓ ===');
              console.error('❌ Direct Status:', directError.status);
              console.error('❌ Direct Error:', directError);
              return throwError(() => error); // Retorna el error original
            })
          );
        }
        
        return throwError(() => error);
      })
    );
  }

  // GET: Logout (confirmado que funciona con GET)
  logout(): Observable<MessageDto | any> {
    const url = `${this.apiUrl}${environment.endpoints.auth.logout}`;
    console.log('🚪 === INICIANDO LOGOUT (GET directo) ===');
    console.log('🚪 URL completa:', url);
    console.log('🚪 Headers:', this.httpOptions.headers);
    
    // Usar GET directamente ya que sabemos que funciona
    const getOptions = {
      ...this.httpOptions,
      responseType: 'text' as 'json'
    };
    
    return this.http.get(url, getOptions).pipe(
      tap((response) => {
        console.log('🚪 === RESPUESTA DEL LOGOUT (GET exitoso) ===');
        console.log('🚪 Response recibida:', typeof response === 'string' ? 'HTML/Text' : 'JSON');
        this.authTokenService.clearToken();
        this.isLoggedInSubject.next(false);
        console.log('✅ Logout exitoso con GET - Sesión cerrada correctamente');
      }),
      catchError((error) => {
        console.log('� === ERROR EN LOGOUT GET ===');
        console.error('❌ Status:', error.status);
        console.error('❌ Status Text:', error.statusText);
        console.error('❌ URL:', error.url);
        
        // Si el status es 200 pero ok es false, es un problema de parsing - tratarlo como éxito
        if (error.status === 200) {
          console.log('✅ GET funcionó realmente (status 200), limpiando sesión...');
          this.authTokenService.clearToken();
          this.isLoggedInSubject.next(false);
          
          // Crear un éxito simulado
          return of({ message: 'Logout completado exitosamente' } as MessageDto);
        }
        
        // Para cualquier otro error, limpiar token local por seguridad
        console.log('🧹 Limpiando token local por seguridad...');
        this.authTokenService.clearToken();
        this.isLoggedInSubject.next(false);
        
        return throwError(() => error);
      })
    );
  }

  // GET: Validar sesión por header según documentación
  validateByHeader(): Observable<SimpleUserDto> {
    const url = `${this.apiUrl}${environment.endpoints.auth.validateHeader}`;
    console.log('🔍 Validando por header en:', url);
    
    return this.http.get<SimpleUserDto>(url, this.httpOptions).pipe(
      tap((user) => {
        this.isLoggedInSubject.next(true);
        console.log('✅ Usuario validado por header:', user);
      })
    );
  }

  // GET: Validar sesión por cookies según documentación
  validateByCookie(): Observable<SimpleUserDto> {
    const url = `${this.apiUrl}${environment.endpoints.auth.validateCookie}`;
    console.log('🍪 Validando por cookie en:', url);
    
    return this.http.get<SimpleUserDto>(url, this.httpOptions).pipe(
      tap((user) => {
        this.isLoggedInSubject.next(true);
        console.log('✅ Usuario validado por cookie:', user);
      })
    );
  }

  // Getter para estado de autenticación
  get isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}