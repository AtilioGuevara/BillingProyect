import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../final-consumer-bill/services/authentication-service';

@Component({
  selector: 'app-final-consumer-bill-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

            <!-- Botón Login/Logout -->
            <button 
              *ngIf="!isAuthenticated && !showSuccessMessage"
              (click)="login()"
              class="btn btn-success transition-all duration-300">
              <i class="align-baseline ri-login-box-line"></i>
              Iniciar Sesión
            </button>

            <button 
              *ngIf="isAuthenticated && !showSuccessMessage"
              (click)="logout()"
              class="btn btn-outline-danger transition-all duration-300">
              <i class="align-baseline ri-logout-box-line"></i>
              Cerrar Sesión
            </button>
          </div>
        </div>
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
  private messageTimeout: any;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Escuchar eventos de login exitoso
    window.addEventListener('loginSuccess', this.handleLoginSuccess.bind(this));
  }

  ngOnDestroy(): void {
    // Limpiar event listener y timeout
    window.removeEventListener('loginSuccess', this.handleLoginSuccess.bind(this));
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }

  private handleLoginSuccess(event: any): void {
    const { message, duration } = event.detail;
    this.successMessage = message;
    this.showSuccessMessage = true;

    console.log('📢 Mostrando mensaje de login exitoso:', message);

    // Ocultar mensaje después del tiempo especificado
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

  /**
   * Verificar si el usuario está autenticado
   */
  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /**
   * Iniciar sesión con monitoreo automático
   */
  login(): void {
    console.log('🚀 Iniciando proceso de login...');
    this.authService.startLoginMonitoring();
  }

  /**
   * Cerrar sesión
   */
  logout(): void {
    this.authService.logout();
  }
}