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


/**
 * Servicio optimizado para manejo de facturas usando Fetch API
 */
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
   * Buscar productos activos por nombre
   */
  searchActiveProductsByName(name: string = ''): Observable<any[]> {
    const url = environment.inventoryApiUrl;
    const params = new URLSearchParams();
    params.set('active', 'true');
    if (name.trim()) {
      params.set('name', name.trim());
    }
    
    const fullUrl = `${url}?${params.toString()}`;
    return this.performFetch<any[]>(fullUrl, 'GET').pipe(
      // Asegurar que solo se retornen productos activos
      map((products: any[]) => products.filter((product: any) => product.active === true))
    );
  }

  /**
   * Obtener todos los productos activos
   */
  getAllActiveProducts(): Observable<any[]> {
    return this.searchActiveProductsByName();
  }

  /**
   * Realizar petición HTTP usando Fetch API
   */
  private performFetch<T>(url: string, method: string, body?: any): Observable<T> {
    console.log('🚀 === INICIANDO PETICIÓN AL BACKEND DE FACTURACIÓN ===');
    console.log('� URL:', url);
    console.log('📝 Método:', method);
    if (body) {
      console.log('📦 Body:', body);
    }
    
    const options = this.getFetchOptions(method, body);
    
    console.log('📋 === RESUMEN DE LA PETICIÓN ===');
    console.log('  - Método:', options.method);
    console.log('  - Credentials:', options.credentials);
    console.log('  - Content-Type:', (options.headers as any)['Content-Type']);
    console.log('  - Authorization:', (options.headers as any)['Authorization'] ? '✅ Bearer token incluido' : '❌ SIN token');
    console.log('  - Cookies enviadas automáticamente:', document.cookie ? '✅ Sí' : '❌ No');
    
    const fetchPromise = fetch(url, options)
      .then(async (response) => {
        console.log('📡 === RESPUESTA DEL SERVIDOR ===');
        console.log('  - Status:', response.status, response.statusText);
        console.log('  - Content-Type:', response.headers.get('content-type'));
        console.log('  - Headers respuesta disponibles:', response.headers);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Error del servidor:', {
            status: response.status,
            statusText: response.statusText,
            errorBody: errorText
          });
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        // Si es método POST para crear factura, retornar como texto
        if (method === 'POST' && url.includes('create')) {
          const result = await response.text();
          console.log('✅ Respuesta exitosa (texto):', result);
          return result as T;
        }
        
        // Para otros casos, parsear como JSON
        const result = await response.json();
        console.log('✅ Respuesta exitosa (JSON):', result);
        return result as T;
      });

    return from(fetchPromise);
  }

  /**
   * Obtener opciones para fetch - envía token como Authorization Bearer + cookies
   */
  private getFetchOptions(method: string = 'GET', body?: any): RequestInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // 🔑 Obtener y agregar token como Authorization Bearer
    const token = this.authService.getToken();
    console.log('🔍 DEBUG - Token obtenido del AuthService:', token ? `${token.substring(0, 20)}...` : 'NO HAY TOKEN');
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('✅ Authorization header agregado:', `Bearer ${token.substring(0, 20)}...`);
    } else {
      console.warn('⚠️ No se encontró token - petición sin Authorization header');
    }

    // 🍪 Log de cookies disponibles
    console.log('🍪 Cookies disponibles para envío automático:', document.cookie || 'SIN COOKIES');

    const options: RequestInit = {
      method,
      headers,
      credentials: 'include' // Enviar cookies automáticamente
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    // 📋 Log final de headers que se enviarán
    console.log('📤 Headers finales que se enviarán:', headers);

    return options;
  }



  // Métodos de compatibilidad con nombres anteriores
  getAllFinalConsumerBillsWithFetch(): Observable<FinalConsumerBillListDTO[]> {
    return this.getAllFinalConsumerBills();
  }

  createFinalConsumerBillWithFetch(bill: CreateFinalConsumerBillDTO): Observable<string> {
    return this.createFinalConsumerBill(bill);
  }
}