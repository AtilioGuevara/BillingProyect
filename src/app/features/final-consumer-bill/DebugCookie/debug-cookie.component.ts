import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-debug-cookie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card">
      <div class="card-header">
        <h6>🧪 Debug Cookie Generator</h6>
      </div>
      <div class="card-body">
        
        <div class="mb-4">
          <label class="form-label">Cookie Value (JWT Token):</label>
          <textarea 
            [(ngModel)]="cookieValue" 
            class="form-input" 
            rows="3"
            placeholder="Pega aquí el JWT token que obtienes del login..."
          ></textarea>
        </div>
        
        <div class="flex gap-2 mb-4">
          <button 
            (click)="generateCookie()" 
            class="btn btn-primary"
            [disabled]="!cookieValue.trim()"
          >
            🍪 Crear Cookie
          </button>
          
          <button 
            (click)="testCookie()" 
            class="btn btn-info"
          >
            🧪 Test Cookie
          </button>
          
          <button 
            (click)="clearCookie()" 
            class="btn btn-danger"
          >
            🗑️ Limpiar Cookie
          </button>
        </div>
        
        <div *ngIf="message" class="alert" [ngClass]="messageClass">
          {{ message }}
        </div>
        
        <!-- Instrucciones -->
        <div class="bg-blue-50 p-4 rounded border-l-4 border-blue-400 mt-4">
          <h6 class="font-semibold text-blue-800">📋 Cómo usar:</h6>
          <ol class="text-sm text-blue-700 mt-2 space-y-1">
            <li>1. Haz login y copia el JWT token de la respuesta</li>
            <li>2. Pégalo en el campo de arriba</li>
            <li>3. Haz clic en "Crear Cookie"</li>
            <li>4. Usa "Test Cookie" para verificar que funciona</li>
            <li>5. ¡Ahora puedes crear facturas sin problemas!</li>
          </ol>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .alert {
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 16px;
    }
    
    .alert-success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    
    .alert-danger {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    
    .alert-info {
      background-color: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
    }
  `]
})
export class DebugCookieComponent {
  cookieValue = '';
  message = '';
  messageClass = '';

  generateCookie(): void {
    if (!this.cookieValue.trim()) {
      this.showMessage('Por favor ingresa un token JWT', 'alert-danger');
      return;
    }

    try {
      // Crear cookie que simule la del login
      const cookieString = `token=${this.cookieValue.trim()}; domain=.beckysflorist.site; path=/; max-age=3600; samesite=None; secure`;
      
      document.cookie = cookieString;
      
      console.log('🍪 Cookie creada:', cookieString);
      console.log('🍪 Cookies actuales:', document.cookie);
      
      this.showMessage('✅ Cookie creada exitosamente! Ahora puedes crear facturas.', 'alert-success');
      
    } catch (error) {
      console.error('❌ Error creando cookie:', error);
      this.showMessage('❌ Error al crear la cookie: ' + (error as Error).message, 'alert-danger');
    }
  }

  testCookie(): void {
    const cookies = document.cookie;
    console.log('🔍 Testing cookies:', cookies);
    
    if (cookies.includes('token=')) {
      this.showMessage('✅ Cookie encontrada! Cookies: ' + cookies, 'alert-success');
    } else {
      this.showMessage('❌ No se encontró la cookie token', 'alert-danger');
    }
  }

  clearCookie(): void {
    // Eliminar cookie estableciendo fecha pasada
    document.cookie = 'token=; domain=.beckysflorist.site; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    console.log('🗑️ Cookie eliminada');
    this.showMessage('🗑️ Cookie eliminada', 'alert-info');
    this.cookieValue = '';
  }

  private showMessage(text: string, cssClass: string): void {
    this.message = text;
    this.messageClass = cssClass;
    
    // Auto-hide después de 5 segundos
    setTimeout(() => {
      this.message = '';
      this.messageClass = '';
    }, 5000);
  }
}