import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  imports: [CommonModule, RouterModule, FinalConsumerBillNavComponent],
  templateUrl: './final-consumer-bill-list.component.html',
  styleUrls: ['./final-consumer-bill-list.component.scss']
})
export class FinalConsumerBillListComponent extends BaseComponent implements OnInit {
  bills: FinalConsumerBillListDTO[] = [];
  state: ComponentState = {
    loadingState: LoadingState.IDLE,
    error: null,
    data: null
  };

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

  ngOnInit(): void {
    // Manejar retorno del login si aplica
    this.handleLoginReturn();
    
    // Cargar facturas
    this.loadBills();
  }



  /**
   * Manejar retorno del login externo
   */
  private handleLoginReturn(): void {
    this.authService.handleLoginReturn();
  }

  /**
   * Cargar lista de facturas
   */
  loadBills(): void {
    this.state.loadingState = LoadingState.LOADING;
    this.state.error = null;

    this.billService.getAllFinalConsumerBills()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          if (this.state.loadingState === LoadingState.LOADING) {
            this.state.loadingState = LoadingState.IDLE;
          }
        })
      )
      .subscribe({
        next: (bills) => {
          this.bills = bills;
          this.state.loadingState = LoadingState.SUCCESS;
          this.state.data = bills;
        },
        error: (error) => {
          this.state.loadingState = LoadingState.ERROR;
          this.handleError(error);
        }
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
      'PROCESSING': 'Procesando'
    };
    
    return statusMap[status.toUpperCase()] || status;
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
}