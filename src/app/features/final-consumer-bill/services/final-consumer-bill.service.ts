import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private readonly inventoryApiUrl = environment.inventoryApiUrl;

  constructor(
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  /**
   * Obtener todas las facturas
   */
  getAllFinalConsumerBills(): Observable<FinalConsumerBillListDTO[]> {
    const url = `${this.apiReadUrl}${environment.endpoints.finalConsumerBill.getAll}`;
    console.log('📋 Obteniendo todas las facturas desde:', url);
    
    return this.performBillingRequest<FinalConsumerBillListDTO[]>(url, 'GET').pipe(
      this.errorHandler.createErrorHandler('Error al cargar las facturas')
    );
  }

  /**
   * Crear nueva factura
   */
  createFinalConsumerBill(bill: CreateFinalConsumerBillDTO): Observable<string> {
    const url = `${this.apiCreateUrl}${environment.endpoints.finalConsumerBill.create}`;
    console.log('💾 Creando factura en:', url);
    
    return this.performBillingRequest<string>(url, 'POST', bill).pipe(
      this.errorHandler.createErrorHandler('Error al crear la factura')
    );
  }

  /**
   * Obtener factura por código de generación
   */
  getFinalConsumerBillByGenerationCode(generationCode: string): Observable<FinalConsumerBillDetailDTO> {
    const url = `${this.apiReadUrl}${environment.endpoints.finalConsumerBill.getByGenerationCode}/${generationCode}`;
    console.log('🔍 Obteniendo factura por código:', generationCode, 'desde:', url);
    
    return this.performBillingRequest<FinalConsumerBillDetailDTO>(url, 'GET').pipe(
      this.errorHandler.createErrorHandler('Error al cargar los detalles de la factura')
    );
  }

  /**
   * Obtener todos los productos activos
   * ⚠️ IMPORTANTE: La API de inventario NO necesita autenticación - SIEMPRE SIN credenciales
   */
  getAllActiveProducts(): Observable<any[]> {
    const url = this.inventoryApiUrl;
    const params = new URLSearchParams();
    params.set('activo', 'true');
    const fullUrl = `${url}?${params.toString()}`;
    
    console.log('📦 Obteniendo productos activos desde:', fullUrl, '(SIN credenciales)');
    
    return from(
      fetch(fullUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        credentials: 'omit' // EXPLÍCITAMENTE sin credenciales
      }).then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    ).pipe(
      map((products: any[]) => products.filter((product: any) => product.activo === true))
    );
  }

  /**
   * 🏭 FACTURACIÓN: HttpClient con AMBOS - Bearer token Y withCredentials
   * El backend puede usar cualquiera de los dos (OR lógico)
   */
  private performBillingRequest<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    body?: any
  ): Observable<T> {
    
    console.log('🏭 FACTURACIÓN: Enviando Bearer token Y cookie httpOnly');
    
    const token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    // SIEMPRE agregar Authorization header si existe token
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
      console.log('🔑 Bearer token agregado al header');
    } else {
      console.warn('⚠️ No se encontró token local para Bearer header');
    }

    const requestOptions = {
      headers,
      withCredentials: true, // SIEMPRE enviar cookies para facturación
      observe: 'body' as const,
      responseType: 'json' as const
    };

    console.log('📋 Facturación - opciones completas:', {
      method,
      withCredentials: true,
      hasBearerToken: !!token,
      url,
      strategy: 'Bearer + Cookie (el backend decide cuál usar)'
    });

    switch (method) {
      case 'GET':
        return this.http.get<T>(url, requestOptions);
      case 'DELETE':
        return this.http.delete<T>(url, requestOptions);
      case 'POST':
        return this.http.post<T>(url, body, requestOptions);
      case 'PUT':
        return this.http.put<T>(url, body, requestOptions);
      case 'PATCH':
        return this.http.patch<T>(url, body, requestOptions);
      default:
        return this.http.get<T>(url, requestOptions);
    }
  }

  // ✅ Métodos de compatibilidad
  getAllFinalConsumerBillsWithFetch(): Observable<FinalConsumerBillListDTO[]> {
    return this.getAllFinalConsumerBills();
  }

  createFinalConsumerBillWithFetch(bill: CreateFinalConsumerBillDTO): Observable<string> {
    return this.createFinalConsumerBill(bill);
  }
}