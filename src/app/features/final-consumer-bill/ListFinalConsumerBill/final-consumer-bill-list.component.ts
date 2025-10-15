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
    // SOLUCIÓN PRINCIPAL: Detectar token en parámetros URL
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token') || 
                        urlParams.get('access_token') || 
                        urlParams.get('authToken') || 
                        urlParams.get('jwt');
    
    if (tokenFromUrl) {
      console.log('🎯 TOKEN RECIBIDO EN URL desde login externo');
      console.log('🔑 Token:', tokenFromUrl.substring(0, 20) + '...');
      
      // Guardar el token usando el AuthService
      this.authService.storeToken(tokenFromUrl);
      
      // Limpiar la URL para mayor seguridad
      const cleanUrl = window.location.protocol + "//" + 
                      window.location.host + 
                      window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
      
      // Mostrar mensaje de éxito
      this.showLoginSuccessMessage();
      
      // Limpiar flags
      localStorage.removeItem('waitingForAuth');
      
      console.log('✅ Login procesado exitosamente via URL');
      return;
    }
    
    // MÉTODO ALTERNATIVO: Verificar si acabamos de llegar del login (cookies)
    const wasWaitingForAuth = localStorage.getItem('waitingForAuth') === 'true';
    
    if (wasWaitingForAuth) {
      console.log('🔍 Detectado retorno de login externo - verificando cookies...');
      console.log('⚠️ NOTA: Las cookies cross-domain pueden no funcionar');
      
      // Limpiar el flag
      localStorage.removeItem('waitingForAuth');
      
      // Verificar cookie con retry (menos confiable entre dominios)
      this.verifyCookieWithRetry(0, 3); // Reducir intentos ya que es menos probable
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
