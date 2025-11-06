import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from './authentication-service';
import { 
  FinalConsumerBillListDTO, 
  CreateFinalConsumerBillDTO, 
  FinalConsumerBillDetailDTO,
  CreateReturnBillDTO,
  ReturnBillResponseDTO
} from '../../../dtos/final-consumer-bill.dto';
import { 
  ReturnBillInfo
} from '../../../dtos/final-consumer-bill.return.dto';

@Injectable({ providedIn: 'root' })
export class FinalConsumerBillService {
  
  private readonly apiCreateUrl = environment.apiCreateUrl;
  private readonly apiReadUrl = environment.apiReadUrl;

  constructor(
    private errorHandler: ErrorHandlerService,
    private authService: AuthService
  ) {}

  /**
   * Obtener todas las facturas
   */
  getAllFinalConsumerBills(): Observable<FinalConsumerBillListDTO[]> {
    const url = `${this.apiReadUrl}${environment.endpoints.finalConsumerBill.getAll}`;
    return this.performFetch<FinalConsumerBillListDTO[]>(url, 'GET').pipe(
      this.errorHandler.createErrorHandler('Error al cargar las facturas')
    );
  }

  /**
   * Crear nueva factura
   */
  createFinalConsumerBill(bill: CreateFinalConsumerBillDTO): Observable<string> {
    const url = `${this.apiCreateUrl}${environment.endpoints.finalConsumerBill.create}`;
    return this.performFetch<string>(url, 'POST', bill).pipe(
      this.errorHandler.createErrorHandler('Error al crear la factura')
    );
  }

  /**
   * Obtener factura por código de generación
   */
  getFinalConsumerBillByGenerationCode(generationCode: string): Observable<FinalConsumerBillDetailDTO> {
    const url = `${this.apiReadUrl}${environment.endpoints.finalConsumerBill.getByGenerationCode}/${generationCode}`;
    return this.performFetch<FinalConsumerBillDetailDTO>(url, 'GET').pipe(
      this.errorHandler.createErrorHandler('Error al cargar los detalles de la factura')
    );
  }

  /**
   * Obtener todos los productos activos
   */
  getAllActiveProducts(): Observable<any[]> {
    const url = environment.inventoryApiUrl;
    const params = new URLSearchParams();
    params.set('activo', 'true');
    const fullUrl = `${url}?${params.toString()}`;
    
    return this.performFetch<any[]>(fullUrl, 'GET').pipe(
      map((products: any[]) => products.filter((product: any) => product.activo === true))
    );
  }

  /**
   * Realizar petición HTTP usando Fetch API - SOLO ENVIAR TOKEN, SIN VALIDAR
   */
  private performFetch<T>(url: string, method: string, body?: any): Observable<T> {
    const options = this.getFetchOptions(url, method, body);
    
    const fetchPromise = fetch(url, options)
      .then(async (response) => {
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Error del servidor:', response.status, errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        return result as T;
      });

    return from(fetchPromise);
  }

  /**
   * SOLO ENVIAR TOKEN EN HEADER - SIN VALIDACIONES
   */
  private getFetchOptions(url: string, method: string = 'GET', body?: any): RequestInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Solo agregar token para endpoints de facturación (no para inventario)
    const inventoryApiUrl = environment.inventoryApiUrl;
    
    if (!url.startsWith(inventoryApiUrl)) {
      const token = this.authService.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const options: RequestInit = {
      method,
      headers
    };

    // Solo incluir credenciales para endpoints de facturación
    if (!url.startsWith(inventoryApiUrl)) {
      options.credentials = 'include';
    }

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    return options;
  }

  // Métodos de compatibilidad
  getAllFinalConsumerBillsWithFetch(): Observable<FinalConsumerBillListDTO[]> {
    return this.getAllFinalConsumerBills();
  }

  createFinalConsumerBillWithFetch(bill: CreateFinalConsumerBillDTO): Observable<string> {
    return this.createFinalConsumerBill(bill);
  }

  /**
   * Obtener información de devolución para una factura
   */
  getReturnInfo(generationCode: string): Observable<ReturnBillInfo> {
        const url = `${environment.apiReadUrl}${(environment.endpoints.finalConsumerBill as any).getReturnInfo}/${generationCode}`;
    return this.performFetch<ReturnBillInfo>(url, 'GET').pipe(
      this.errorHandler.createErrorHandler('Error al obtener información de devolución')
    );
  }

  /**
   * Crear factura de devolución
   */
  createReturnBill(originalGenerationCode: string, returnData: CreateReturnBillDTO): Observable<ReturnBillResponseDTO> {
    const url = `${environment.apiCreateUrl}${(environment.endpoints.finalConsumerBill as any).createReturn}/${originalGenerationCode}`;
    return this.performFetch<ReturnBillResponseDTO>(url, 'POST', returnData).pipe(
      this.errorHandler.createErrorHandler('Error al crear la factura de devolución')
    );
  }

  /**
   * Verificar si una factura puede ser devuelta
   */
  canBillBeReturned(generationCode: string): Observable<boolean> {
    return this.getReturnInfo(generationCode).pipe(
      map(info => info.canBeReturned),
      catchError(() => from([false]))
    );
  }
}