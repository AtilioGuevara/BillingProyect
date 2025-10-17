import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../final-consumer-bill/services/authentication-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-final-consumer-bill-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="card mb-6">
      <div class="card-header">
        <div class="items-center gap-3 md:flex">
          <div class="grow flex items-center space-x-2">
            <span class="text-xl">📄</span>
            <h6 class="mb-3 md:mb-0">Gestión de Facturas</h6>
          </div>
          <div class="flex flex-wrap items-center gap-2 shrink-0">
            <button 
              [routerLink]="['/final-consumer-bill/create']"
              [class]="isCreateActive() ? 'btn btn-primary' : 'btn btn-sub-gray'"
              class="transition-all duration-300">
              <i class="align-baseline ri-add-line"></i>
              Nueva Factura
            </button>
            
            <button 
              [routerLink]="['/final-consumer-bill/list']"
              [class]="isListActive() ? 'btn btn-primary' : 'btn btn-sub-gray'"
              class="transition-all duration-300">
              <i class="align-baseline ri-file-list-3-line"></i>
              Lista de Facturas
            </button>

            <button 
              [routerLink]="['/final-consumer-bill/search']"
              [class]="isSearchActive() ? 'btn btn-primary' : 'btn btn-sub-gray'"
              class="transition-all duration-300">
              <i class="align-baseline ri-search-line"></i>
              Buscar Factura
            </button>

            <!-- Separador -->
            <div class="hidden md:block w-px h-6 bg-gray-300 mx-2"></div>

            <!-- Mensaje de Login Exitoso -->
            <div *ngIf="showSuccessMessage" 
                 class="flex items-center bg-green-100 text-green-800 px-3 py-2 rounded-lg border border-green-200 animate-fade-in">
              <i class="align-baseline ri-checkbox-circle-line mr-2 text-green-600"></i>
              <span class="text-sm font-medium">{{ successMessage }}</span>
              <button 
                (click)="hideSuccessMessage()"
                class="ml-2 text-green-600 hover:text-green-800 focus:outline-none">
                <i class="align-baseline ri-close-line"></i>
              </button>
            </div>

            <!-- Usuario Logueado -->
            <div *ngIf="isLoggedIn && currentUser && !showSuccessMessage" 
                 class="flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-lg border border-blue-200">
              <i class="align-baseline ri-user-line mr-2 text-blue-600"></i>
              <span class="text-sm font-medium">{{ currentUser.username }}</span>
            </div>

            <!-- Botón Login -->
            <button 
              *ngIf="!isLoggedIn && !showSuccessMessage"
              (click)="openLoginModal()"
              class="btn btn-success transition-all duration-300">
              <i class="align-baseline ri-login-box-line"></i>
              Iniciar Sesión
            </button>

            <!-- Botón Logout -->
            <button 
              *ngIf="isLoggedIn && !showSuccessMessage"
              (click)="logout()"
              class="btn btn-outline-danger transition-all duration-300">
              <i class="align-baseline ri-logout-box-line"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Login -->
    <div *ngIf="showLoginModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-96 max-w-90vw">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Iniciar Sesión</h3>
          <button (click)="closeLoginModal()" class="text-gray-400 hover:text-gray-600">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
        
        <form (ngSubmit)="login()" #loginForm="ngForm">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
            <input 
              type="text" 
              id="username"
              name="username"
              [(ngModel)]="loginCredentials.username"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu usuario">
          </div>
          
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <input 
              type="password" 
              id="password"
              name="password"
              [(ngModel)]="loginCredentials.password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña">
          </div>
          
          <!-- Mensaje de Error -->
          <div *ngIf="loginError" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {{ loginError }}
          </div>
          
          <div class="flex gap-3">
            <button 
              type="button"
              (click)="closeLoginModal()"
              class="flex-1 btn btn-outline-gray">
              Cancelar
            </button>
            <button 
              type="submit"
              [disabled]="loginForm.invalid || isLoggingIn"
              class="flex-1 btn btn-primary">
              <span *ngIf="!isLoggingIn">Ingresar</span>
              <span *ngIf="isLoggingIn" class="flex items-center">
                <i class="ri-loader-line animate-spin mr-2"></i>
                Ingresando...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    button:hover {
      transform: translateY(-1px);
    }
    
    button:active {
      transform: translateY(0);
    }
    
    .card-header h6 {
      color: var(--primary-color, #6d28d9);
      font-weight: 600;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .animate-spin {
      animation: spin 1s linear infinite;
    }
    
    .max-w-90vw {
      max-width: 90vw;
    }
    
    @media (max-width: 768px) {
      .flex-wrap {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .gap-2 > * {
        width: 100%;
        justify-content: center;
      }
      
      .animate-fade-in {
        margin-top: 0.5rem;
        width: 100%;
      }
    }
  `]
})
export class FinalConsumerBillNavComponent implements OnInit, OnDestroy {
  showSuccessMessage = false;
  successMessage = '';
  showLoginModal = false;
  isLoggingIn = false;
  loginError = '';
  isLoggedIn = false;
  currentUser: User | null = null;
  
  loginCredentials = {
    username: '',
    password: ''
  };
  
  private messageTimeout: any;
  private subscriptions: Subscription[] = [];
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        console.log('🔄 Estado de login actualizado:', isLoggedIn);
      })
    );
    
    // Suscribirse al usuario actual
    this.subscriptions.push(
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
        console.log('👤 Usuario actual:', user);
      })
    );
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones
    this.subscriptions.forEach(sub => sub.unsubscribe());
    
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }

  openLoginModal(): void {
    this.showLoginModal = true;
    this.loginError = '';
    this.loginCredentials = { username: '', password: '' };
  }

  closeLoginModal(): void {
    this.showLoginModal = false;
    this.loginError = '';
    this.isLoggingIn = false;
  }

  async login(): Promise<void> {
    if (!this.loginCredentials.username || !this.loginCredentials.password) {
      this.loginError = 'Por favor ingresa usuario y contraseña';
      return;
    }

    this.isLoggingIn = true;
    this.loginError = '';

    try {
      console.log('🔐 Intentando login con:', this.loginCredentials.username);
      
      const result = await this.authService.login(
        this.loginCredentials.username, 
        this.loginCredentials.password
      );

      if (result.success) {
        console.log('✅ Login exitoso');
        this.closeLoginModal();
        this.showSuccessMessageTemp('¡Sesión iniciada correctamente!', 3000);
      } else {
        console.log('❌ Login fallido:', result.message);
        this.loginError = result.message;
      }
    } catch (error) {
      console.error('❌ Error inesperado en login:', error);
      this.loginError = 'Error inesperado. Inténtalo nuevamente.';
    } finally {
      this.isLoggingIn = false;
    }
  }

  logout(): void {
    console.log('🚪 Cerrando sesión...');
    this.authService.logout();
    this.showSuccessMessageTemp('Sesión cerrada correctamente', 2000);
  }

  private showSuccessMessageTemp(message: string, duration: number): void {
    this.successMessage = message;
    this.showSuccessMessage = true;

    this.messageTimeout = setTimeout(() => {
      this.hideSuccessMessage();
    }, duration);
  }

  hideSuccessMessage(): void {
    this.showSuccessMessage = false;
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }
  
  isCreateActive(): boolean {
    return this.router.url.includes('/create');
  }
  
  isListActive(): boolean {
    return this.router.url.includes('/list');
  }

  isSearchActive(): boolean {
    return this.router.url.includes('/search');
  }
}