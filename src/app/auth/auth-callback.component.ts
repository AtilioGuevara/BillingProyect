import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../features/final-consumer-bill/services/authentication-service';

@Component({
  selector: 'app-auth-callback',
  template: `
    <div class="auth-callback-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <h3>Procesando autenticación...</h3>
        <p>{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .auth-callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f8f9fa;
    }
    
    .loading-spinner {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 2s linear infinite;
      margin: 0 auto 1rem;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    h3 {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #7f8c8d;
      font-size: 0.9rem;
    }
  `],
  standalone: true
})
export class AuthCallbackComponent implements OnInit {
  message: string = 'Guardando token...';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.processAuthCallback();
  }

  private processAuthCallback() {
    // Buscar token en URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const tokenFromHash = this.getTokenFromHash();
    
    if (tokenFromUrl) {
      this.handleTokenReceived(tokenFromUrl);
      return;
    }
    
    if (tokenFromHash) {
      this.handleTokenReceived(tokenFromHash);
      return;
    }
    
    // Si no hay token en URL, verificar cookies
    setTimeout(() => {
      const tokenFromCookie = this.authService.getToken();
      
      if (tokenFromCookie) {
        this.redirectToApp();
      } else {
        this.handleError();
      }
    }, 1000);
  }

  private getTokenFromHash(): string | null {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    return params.get('token') || params.get('access_token');
  }

  private handleTokenReceived(token: string) {
    this.message = 'Guardando token...';
    
    // Solo guardar el token, sin validaciones
    this.authService.storeToken(token);
    
    // Limpiar la URL
    this.cleanUrl();
    
    // Redirigir
    this.redirectToApp();
  }

  private redirectToApp() {
    this.message = 'Redirigiendo...';
    
    setTimeout(() => {
      this.router.navigate(['/final-consumer-bill/list']);
    }, 1000);
  }

  private handleError() {
    this.message = 'Error: No se recibió token';
    
    setTimeout(() => {
      this.authService.redirectToLogin();
    }, 3000);
  }

  private cleanUrl() {
    const cleanUrl = window.location.protocol + "//" + 
                    window.location.host + 
                    window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }
}