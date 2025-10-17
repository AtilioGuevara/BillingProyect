import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../final-consumer-bill/services/authentication-service';

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

            <!-- Mensaje de éxito temporal -->
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

            <!-- Indicador de token (opcional) -->
            <div *ngIf="hasToken() && !showSuccessMessage" 
                 class="flex items-center bg-blue-100 text-blue-800 px-3 py-2 rounded-lg border border-blue-200">
              <i class="align-baseline ri-shield-check-line mr-2 text-blue-600"></i>
              <span class="text-sm font-medium">Autenticado</span>
            </div>

            <!-- Botón Login -->
            <button 
              *ngIf="!hasToken() && !showSuccessMessage"
              (click)="loginWithRedirect()"
              class="btn btn-success transition-all duration-300">
              <i class="align-baseline ri-login-box-line"></i>
              Iniciar Sesión
            </button>

            <!-- Botón Logout -->
            <button 
              *ngIf="hasToken() && !showSuccessMessage"
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
export class FinalConsumerBillNavComponent {
  showSuccessMessage = false;
  successMessage = '';
  private messageTimeout: any;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  /**
   * LOGIN CON REDIRECCIÓN - Solo redirigir
   */
  loginWithRedirect(): void {
    console.log('🔄 Iniciando login con redirección...');
    this.authService.loginWithRedirect();
  }

  /**
   * LOGOUT - Solo limpiar token
   */
  logout(): void {
    console.log('🚪 Cerrando sesión...');
    this.authService.logout();
    this.showSuccessMessageTemp('Sesión cerrada correctamente', 2000);
  }

  /**
   * VERIFICAR SI HAY TOKEN - Sin validar, solo verificar existencia
   */
  hasToken(): boolean {
    const token = this.authService.getToken();
    return !!token && token !== 'undefined' && token !== 'null';
  }

  /**
   * MOSTRAR MENSAJE TEMPORAL
   */
  private showSuccessMessageTemp(message: string, duration: number): void {
    this.successMessage = message;
    this.showSuccessMessage = true;

    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }

    this.messageTimeout = setTimeout(() => {
      this.hideSuccessMessage();
    }, duration);
  }

  /**
   * OCULTAR MENSAJE
   */
  hideSuccessMessage(): void {
    this.showSuccessMessage = false;
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }
  
  /**
   * MÉTODOS DE NAVEGACIÓN
   */
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
   * CLEANUP
   */
  ngOnDestroy(): void {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }
}