import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/final-consumer-bill/services/authentication-service';

@Component({
  selector: 'app-auth-callback',
  template: `
    <div class="auth-callback-container">
      <div class="loading-spinner">
        <h3>Procesando autenticación...</h3>
        <p>Por favor espera mientras verificamos tu sesión.</p>
      </div>
    </div>
  `,
  styles: [`
    .auth-callback-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .loading-spinner {
      text-align: center;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
  `]
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('🔄 Componente de callback iniciado');
    
    // Procesar el retorno del login
    this.authService.handleLoginCallback();
    
    // Verificar autenticación después de un breve delay
    setTimeout(() => {
      if (this.authService.isAuthenticated()) {
        console.log('✅ Usuario autenticado, redirigiendo al dashboard');
        this.router.navigate(['/dashboard']);
      } else {
        console.log('❌ Autenticación falló, redirigiendo al home');
        this.router.navigate(['/']);
      }
    }, 2000);
  }
}