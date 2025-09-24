import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, LoginRequest } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

/**
 * 🏷️ DevBadge Component
 * 
 * Este componente proporciona una insignia de desarrollo que solo es visible en modo de desarrollo.
 * Permite a los desarrolladores iniciar y cerrar sesión y muestra el estado de validación de la sesión actual.
 * 
 * Está diseñado para ser utilizado dentro del componente `DevContainer` para garantizar que solo se renderice en entornos de desarrollo.
 */
@Component({
  selector: 'app-dev-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- 🏷️ BADGE DE DESARROLLO - Solo visible en desarrollo -->
    <div 
      *ngIf="!environment.production" 
      class="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-2xl border border-purple-300 min-w-[280px] max-w-[320px]"
    >
      <!-- Header del badge -->
      <div class="bg-black/20 px-4 py-2 rounded-t-lg border-b border-white/20">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            DevBadge
          </h3>
          <span class="text-xs bg-green-500 px-2 py-1 rounded-full">DEV</span>
        </div>
      </div>

      <!-- Contenido del badge -->
      <div class="p-4 space-y-3">
        <!-- Estado de autenticación -->
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Estado:</span>
          <div class="flex items-center gap-2">
            <div 
              class="w-2 h-2 rounded-full"
              [class]="isAuthenticated() ? 'bg-green-400' : 'bg-red-400'"
            ></div>
            <span class="text-xs">
              {{ isAuthenticated() ? 'Autenticado' : 'No autenticado' }}
            </span>
          </div>
        </div>

        <!-- Información del usuario (si está autenticado) -->
        <div *ngIf="isAuthenticated()" class="bg-white/10 rounded p-2">
          <p class="text-xs text-gray-200">
            <strong>Usuario:</strong> Sesión activa
          </p>
          <p class="text-xs text-gray-200">
            <strong>API:</strong> {{ apiUrl }}
          </p>
        </div>

        <!-- Controles de autenticación -->
        <div class="space-y-2">
          <!-- Botón de login -->
          <button
            *ngIf="!isAuthenticated()"
            (click)="quickLogin()"
            [disabled]="isLoading()"
            class="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg *ngIf="!isLoading()" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            <svg *ngIf="isLoading()" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading() ? 'Conectando...' : 'Quick Login' }}
          </button>

          <!-- Botón de logout -->
          <button
            *ngIf="isAuthenticated()"
            (click)="quickLogout()"
            [disabled]="isLoading()"
            class="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg *ngIf="!isLoading()" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"/>
            </svg>
            <svg *ngIf="isLoading()" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading() ? 'Desconectando...' : 'Logout' }}
          </button>
        </div>

        <!-- Información de estado -->
        <div *ngIf="statusMessage()" class="text-xs text-center p-2 rounded" 
             [class]="statusMessage().includes('Error') ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'">
          {{ statusMessage() }}
        </div>

        <!-- Footer con información de la API -->
        <div class="text-xs text-gray-300 border-t border-white/20 pt-2">
          <p><strong>API Auth:</strong></p>
          <p class="truncate">{{ apiUrl }}</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DevBadgeComponent implements OnInit {
  private authService = inject(AuthService);
  
  // Señales reactivas para el estado
  isLoading = signal(false);
  statusMessage = signal('');
  
  // Variables de entorno
  environment = environment;
  apiUrl = environment.authApiUrl; // Usar la URL específica de auth
  
  ngOnInit(): void {
    // Limpiar mensaje de estado después de 5 segundos
    setInterval(() => {
      if (this.statusMessage()) {
        this.statusMessage.set('');
      }
    }, 5000);

    // Mostrar mensaje si la API está pendiente
    if (environment.authApiUrl === 'http://37.60.243.227:8090/api') {
      this.statusMessage.set('⏳ API de auth pendiente');
    }
  }

  /**
   * 🔍 Verificar si está autenticado
   */
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  /**
   * 🚀 Login rápido para desarrollo
   */
  quickLogin(): void {
    this.isLoading.set(true);
    this.statusMessage.set('');
    
    // Usar credenciales de desarrollo del environment
    const devCredentials: LoginRequest = {
      username: environment.devBadge.defaultCredentials.username,
      password: environment.devBadge.defaultCredentials.password
    };

    this.authService.login(devCredentials).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.statusMessage.set('✅ Login exitoso');
        console.log('🏷️ DevBadge: Login exitoso', response);
      },
      error: (error) => {
        this.isLoading.set(false);
        if (error.status === 404) {
          this.statusMessage.set('⏳ API de auth no disponible');
        } else {
          this.statusMessage.set('❌ Error en login');
        }
        console.error('🏷️ DevBadge: Error en login', error);
      }
    });
  }

  /**
   * 🚪 Logout rápido para desarrollo
   */
  quickLogout(): void {
    this.isLoading.set(true);
    this.statusMessage.set('');

    this.authService.logout().subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.statusMessage.set('✅ Logout exitoso');
        console.log('🏷️ DevBadge: Logout exitoso', response);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.statusMessage.set('❌ Error en logout');
        console.error('🏷️ DevBadge: Error en logout', error);
      }
    });
  }
}