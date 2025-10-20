import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { 
  CreateFinalConsumerBillDTO, 
  FinalConsumerBillListDTO, 
  FinalConsumerBillDetailDTO 
} from '../../../dtos/final-consumer-bill.dto';
import { environment } from '../../../../environments/environment';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { AuthService } from './authentication-service';

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
    console.log('🚀 Enviando petición:', method, url);
    
    const options = this.getFetchOptions(url, method, body);
    
    const fetchPromise = fetch(url, options)
      .then(async (response) => {
        console.log('📡 Respuesta:', response.status, response.statusText);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Error del servidor:', response.status, errorText);
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log('✅ Respuesta exitosa');
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
    const inventoryApiUrl = 'http://37.60.243.227:8080/api/productos';
    
    if (!url.startsWith(inventoryApiUrl)) {
      const token = this.authService.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('✅ Token enviado en header Authorization');
      } else {
        console.log('⚠️ No hay token disponible');
      }
    }

    const options: RequestInit = {
      method,
      headers,
      credentials: 'include'
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
}