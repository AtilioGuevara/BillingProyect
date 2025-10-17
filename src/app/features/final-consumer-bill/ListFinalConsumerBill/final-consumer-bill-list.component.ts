import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { FinalConsumerBillListDTO } from '../../../dtos/final-consumer-bill.dto';
import { FinalConsumerBillNavComponent } from '../../NavComponents/final-consumer-bill-nav.component';
import { AuthService } from '../services/authentication-service';

@Component({
  selector: 'app-final-consumer-bill-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FinalConsumerBillNavComponent],
  templateUrl: './final-consumer-bill-list.component.html',
  styleUrls: ['./final-consumer-bill-list.component.scss']
})
export class FinalConsumerBillListComponent implements OnInit {
  bills: FinalConsumerBillListDTO[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private billService: FinalConsumerBillService, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

    // Método para navegar a la vista de detalles
  viewBillDetails(generationCode: string): void {
    console.log('🔍 Navegando a detalles de factura:', generationCode);
    this.router.navigate(['/final-consumer-bill/view', generationCode]);
  }

  // Método alternativo si tienes el objeto completo de la factura
  viewBillDetailsFromObject(bill: any): void {
    if (bill.generationCode) {
      this.viewBillDetails(bill.generationCode);
    } else {
      console.error('❌ La factura no tiene código de generación:', bill);
    }
  }

  ngOnInit(): void {
    // Verificar si venimos del login exitoso
    this.checkLoginSuccess();
    
    this.loadBills();
  }

  private checkLoginSuccess(): void {
    // Verificar si acabamos de llegar del login
    // Esto sucede cuando:
    // 1. No teníamos autenticación previa (flag en localStorage)
    // 2. Ahora sí tenemos cookies de autenticación
    
    const wasWaitingForAuth = localStorage.getItem('waitingForAuth') === 'true';
    
    if (wasWaitingForAuth) {
      console.log('🔍 Detectado retorno de login externo - verificando autenticación...');
      
      // Limpiar el flag
      localStorage.removeItem('waitingForAuth');
      
      // Verificar cookie con retry
      this.verifyCookieWithRetry(0, 5);
    }
  }

  private verifyCookieWithRetry(attempt: number, maxAttempts: number): void {
    console.log(`🔄 Intento ${attempt + 1}/${maxAttempts} - Verificando cookie de autenticación...`);
    
    setTimeout(() => {
      if (this.authService.isAuthenticated()) {
        console.log('✅ ¡Cookie de autenticación detectada correctamente!');
        this.showLoginSuccessMessage();
      } else if (attempt < maxAttempts - 1) {
        // Intentar de nuevo
        this.verifyCookieWithRetry(attempt + 1, maxAttempts);
      } else {
        console.log('❌ No se pudo verificar la cookie de autenticación');
      }
    }, 1000); // Esperar 1 segundo entre intentos
  }

  private showLoginSuccessMessage(): void {
    // Emitir evento para que el navbar muestre el mensaje
    window.dispatchEvent(new CustomEvent('loginSuccess', {
      detail: { 
        message: '¡Login exitoso! Sesión iniciada correctamente',
        duration: 10000 // 10 segundos
      }
    }));
  }

  // 🧪 MÉTODO DE DEBUGGING - Para establecer token manualmente
  setTestToken(): void {
    const testToken = prompt('Ingresa el token para pruebas:');
    if (testToken && testToken.trim()) {
      this.authService.setTestToken(testToken.trim());
      // Recargar facturas después de establecer el token
      setTimeout(() => {
        this.loadBills();
      }, 1000);
    }
  }

  // 🧪 MÉTODO DE DEBUGGING - Verificar estado de autenticación
  debugAuth(): void {
    console.log('🔍 DEBUG - Estado de autenticación:');
    console.log('  - isAuthenticated():', this.authService.isAuthenticated());
    console.log('  - localStorage token:', localStorage.getItem('authToken'));
    console.log('  - cookies:', document.cookie);
  }

  loadBills(): void {
    this.loading = true;
    this.errorMsg = '';
    
    this.billService.getAllFinalConsumerBills().subscribe({
      next: (data: FinalConsumerBillListDTO[]) => {
        this.bills = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bills:', error);
        this.errorMsg = 'Error al cargar las facturas. Verifique que el endpoint del backend esté disponible.';
        this.loading = false;
      }
    });
  }

  refreshBills(): void {
    this.loadBills();
  }

  getStatusText(status: string | undefined | null): string {
    const statusMap: { [key: string]: string } = {
      'DRAFT': 'Borrador',
      'SENT': 'Enviada',
      'PENDING': 'Pendiente',
      'APPROVED': 'Aprobada',
      'REJECTED': 'Rechazada'
    };
    return statusMap[status || 'DRAFT'] || 'Sin Estado';
  }
}
