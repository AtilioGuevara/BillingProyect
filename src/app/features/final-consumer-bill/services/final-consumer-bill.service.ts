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
  searchActiveProductsByName(nombre: string = ''): Observable<any[]> {
    const url = environment.inventoryApiUrl;
    const params = new URLSearchParams();
    params.set('activo', 'true');
    if (nombre.trim()) {
      params.set('nombre', nombre.trim());
    }

    const fullUrl = `${url}?${params.toString()}`;
    return this.performFetch<any[]>(fullUrl, 'GET').pipe(
      // Asegurar que solo se retornen productos activos
      map((products: any[]) => products.filter((product: any) => product.activo === true)) // Cambiar "active" a "activo"
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
    
    const options = this.getFetchOptions(url, method, body);
    
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

        const result = await response.json();
        console.log('✅ Respuesta exitosa (JSON):', result);
        return result as T;
      });

    return from(fetchPromise);
  }

  /**
   * Obtener opciones para fetch - envía token como Authorization Bearer + cookies
   * Excluye el token para el endpoint de inventario
   */
  private getFetchOptions(url: string, method: string = 'GET', body?: any): RequestInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // URL específica donde NO se debe enviar el Bearer token
    const inventoryApiUrl = 'http://37.60.243.227:8080/api/productos';

    // Solo agregar el token si NO es el endpoint de inventario
    if (!url.startsWith(inventoryApiUrl)) {
      const token = this.authService.getToken();
      console.log('🔍 DEBUG - Token obtenido del AuthService:', token ? `${token.substring(0, 20)}...` : 'NO HAY TOKEN');
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('✅ Authorization header agregado para URL:', url);
      } else {
        console.warn('⚠️ No se encontró token - petición sin Authorization header');
      }
    } else {
      console.log('🚫 NO se agrega Authorization header para endpoint de inventario:', url);
    }

    // 🍪 Log de cookies disponibles
    console.log('🍪 Cookies disponibles para envío automático:', document.cookie || 'SIN COOKIES');

    const options: RequestInit = {
      method,
      headers
    };

    // Solo incluir credenciales si NO es el endpoint de inventario
    if (!url.startsWith('http://37.60.243.227:8080/api/productos')) {
      options.credentials = 'include'; // Enviar cookies automáticamente solo para otros endpoints
      console.log('🍪 Credenciales incluidas para:', url);
    } else {
      console.log('🚫 NO se incluyen credenciales para endpoint de inventario:', url);
    }

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

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