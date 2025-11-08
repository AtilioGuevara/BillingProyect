import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { takeUntil, finalize } from 'rxjs';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { FinalConsumerBillListDTO } from '../../../dtos/final-consumer-bill.dto';
import { FinalConsumerBillNavComponent } from '../../NavComponents/final-consumer-bill-nav.component';
import { AuthService } from '../services/authentication-service';
import { BaseComponent, LoadingState, ComponentState } from '../../../types/common.types';

/**
 * Componente optimizado para la lista de facturas
 */
@Component({
  selector: 'app-final-consumer-bill-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FinalConsumerBillNavComponent],
  templateUrl: './final-consumer-bill-list.component.html',
  styleUrls: ['./final-consumer-bill-list.component.scss']
})
export class FinalConsumerBillListComponent extends BaseComponent implements OnInit {
  bills: FinalConsumerBillListDTO[] = [];
  filteredBills: FinalConsumerBillListDTO[] = []; // Lista filtrada
  state: ComponentState = {
    loadingState: LoadingState.IDLE,
    error: null,
    data: null
  };

  // Filtros de fecha
  startDate: string = '';
  endDate: string = '';

  // Getter para compatibilidad con template
  get loading(): boolean {
    return this.state.loadingState === LoadingState.LOADING;
  }

  get errorMsg(): string {
    return this.state.error || '';
  }

  constructor(
    private billService: FinalConsumerBillService, 
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    // Manejar retorno del login si aplica
    await this.handleLoginReturn();
    
    // Cargar facturas directamente, la validación la hace el backend
    this.loadBills();
  }

  /**
   * Manejar retorno del login externo
   */
  private async handleLoginReturn(): Promise<void> {
    // Procesar cualquier token en la URL
    
    
    // Verificar si acabamos de completar un login
    if (localStorage.getItem('waitingForAuth') === 'true') {
      localStorage.removeItem('waitingForAuth');
      
      // Disparar evento de login exitoso
      window.dispatchEvent(new CustomEvent('loginSuccess', {
        detail: {
          message: 'Sesión iniciada correctamente',
          duration: 3000
        }
      }));
      
      // Recargar facturas
      this.loadBills();
    }
  }

  /**
   * Cargar lista de facturas - La validación la hace el backend
   */
  async loadBills(): Promise<void> {
    console.log('📋 Iniciando carga de facturas...');
    console.log('🔑 Estado AuthService:', {
      hasToken: !!this.authService.getToken(),
    });
    console.log('🍪 Cookies del navegador:', document.cookie);
    
    this.state.loadingState = LoadingState.LOADING;
    this.state.error = null;

    this.billService.getAllFinalConsumerBills()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          if (this.state.loadingState === LoadingState.LOADING) {
            this.state.loadingState = LoadingState.IDLE;
            console.log('✅ Estado de carga finalizado');
          }
        })
      )
      .subscribe({
        next: (bills) => {
          console.log('🎉 Facturas cargadas exitosamente:', bills.length);
          console.log('📊 Datos de facturas:', bills);
          console.log('📅 Primera factura:', bills[0]);
          
          // Cargar detalles de cada factura para obtener las fechas
          this.bills = bills;
          this.filteredBills = [...bills]; // Inicializar lista filtrada
          this.state.loadingState = LoadingState.SUCCESS;
          this.state.data = bills;
          
          // Cargar fechas para cada factura en background
          this.loadBillDatesInBackground(bills);
        },
        error: (error) => {
          console.error('❌ Error al cargar facturas:', error);
          this.state.loadingState = LoadingState.ERROR;
          
          // Si es error de autenticación, redirigir al login
          if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
            console.log('🔐 Error de autenticación detectado, limpiando sesión...');
            this.authService.logout();
          } else {
            this.handleError(error);
          }
        }
      });
  }

  /**
   * Cargar fechas de facturas en background sin bloquear la UI
   */
  private loadBillDatesInBackground(bills: FinalConsumerBillListDTO[]): void {
    bills.forEach((bill, index) => {
      setTimeout(() => {
        this.billService.getFinalConsumerBillByGenerationCode(bill.generationCode)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (detail) => {
              // Actualizar la factura con la fecha
              if (detail.billGenerationDate) {
                bill.createdAt = detail.billGenerationDate;
              }
            },
            error: (error) => {
              console.warn(`⚠️ Error cargando fecha para factura ${index + 1}:`, error);
            }
          });
      }, index * 200); // Espaciar las peticiones para no sobrecargar
    });
  }

  /**
   * Refrescar lista de facturas
   */
  refreshBills(): void {
    this.loadBills();
  }

  /**
   * Navegar a los detalles de una factura
   */
  viewBillDetails(generationCode: string): void {
    if (!generationCode) {
      console.error('❌ Código de generación no proporcionado');
      return;
    }
    
    this.router.navigate(['/final-consumer-bill/view', generationCode]);
  }

  /**
   * Navegar a detalles desde objeto factura
   */
  viewBillDetailsFromObject(bill: FinalConsumerBillListDTO): void {
    if (bill?.generationCode) {
      this.viewBillDetails(bill.generationCode);
    } else {
      console.error('❌ La factura no tiene código de generación válido');
    }
  }

  /**
   * Obtener texto del estado de la factura
   */
  getStatusText(status: string | undefined | null): string {
    if (!status) return 'Sin estado';
    
    const statusMap: Record<string, string> = {
      'PENDING': 'Pendiente',
      'PAID': 'Pagada', 
      'CANCELLED': 'Cancelada',
      'PROCESSING': 'Procesando',
      'APPROVED': 'Aprobada',
      'SENT': 'Enviada',
      'DRAFT': 'Borrador',
      'ACTIVE': 'Activa'
    };
    
    return statusMap[status.toUpperCase()] || status;
  }

  /**
   * Obtener fecha válida de la factura
   */
  getDateDisplay(bill: FinalConsumerBillListDTO): string {
    const dateStr = bill.createdAt;
    if (!dateStr) return 'Sin fecha';
    
    // Intentar parsear la fecha
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Fecha inválida';
    
    return date.toLocaleDateString('es-SV', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  /**
   * Obtener hora válida de la factura
   */
  getTimeDisplay(bill: FinalConsumerBillListDTO): string {
    const dateStr = bill.createdAt;
    if (!dateStr) return '--:--:--';
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '--:--:--';
    
    return date.toLocaleTimeString('es-SV', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  /**
   * Crear devolución - redirige al create con modo devolución
   */
  createReturn(generationCode: string): void {
    this.router.navigate(['/final-consumer-bill/create'], {
      queryParams: { 
        mode: 'return', 
        returnFrom: generationCode 
      }
    });
  }

  /**
   * Obtener texto del estado considerando devoluciones
   */
  getBillStatusText(bill: FinalConsumerBillListDTO): string {
    // Si esta ES una factura de devolución (creada a partir de otra)
    if (bill.originBillCode) {
      return `DEVOLUCIÓN DE: ${bill.originBillCode}`;
    }
    
    // Si la factura original fue devuelta
    if (bill.isReversed) {
      return 'DEVUELTA';
    }
    
    // Estado normal de la factura
    return this.getStatusText(bill.status || 'APPROVED');
  }

  /**
   * Manejar errores de forma centralizada
   */
  private handleError(error: any): void {
    console.error('❌ Error en lista de facturas:', error);
    
    let errorMessage: string;
    
    if (error.message?.includes('401') || error.message?.includes('403')) {
      errorMessage = 'No autorizado. Redirigiendo al login...';
      setTimeout(() => this.authService.redirectToLogin(), 2000);
    } else if (error.message?.includes('404')) {
      errorMessage = 'Servicio no encontrado. Verifique la configuración.';
    } else if (error.message?.includes('500')) {
      errorMessage = 'Error interno del servidor. Intente más tarde.';
    } else if (error.message?.includes('NetworkError') || !navigator.onLine) {
      errorMessage = 'Sin conexión a internet. Verifique su conexión.';
    } else {
      errorMessage = 'Error al cargar las facturas. Intente nuevamente.';
    }

    this.state.error = errorMessage;

    // Limpiar mensaje después de 10 segundos
    setTimeout(() => {
      this.state.error = null;
    }, 10000);
  }

  /**
   * Filtrar facturas por rango de fechas
   */
  filterByDateRange(): void {
    if (!this.startDate && !this.endDate) {
      this.filteredBills = [...this.bills];
      return;
    }

    this.filteredBills = this.bills.filter(bill => {
      const billDate = this.getBillDateForFilter(bill);
      if (!billDate) return false;

      const billDateObj = new Date(billDate);
      const startDateObj = this.startDate ? new Date(this.startDate) : null;
      const endDateObj = this.endDate ? new Date(this.endDate + 'T23:59:59') : null;

      if (startDateObj && billDateObj < startDateObj) return false;
      if (endDateObj && billDateObj > endDateObj) return false;

      return true;
    });
  }

  /**
   * Limpiar filtros de fecha
   */
  clearDateFilters(): void {
    this.startDate = '';
    this.endDate = '';
    this.filteredBills = [...this.bills];
  }

  /**
   * Obtener fecha de la factura para filtrado
   */
  private getBillDateForFilter(bill: FinalConsumerBillListDTO): string | null {
    // Intentar usar billGenerationDate si está disponible
    if (bill.billGenerationDate) {
      return bill.billGenerationDate;
    }
    
    // Fallback a otras fechas disponibles
    if (bill.createdAt) {
      return bill.createdAt;
    }

    return null;
  }
}