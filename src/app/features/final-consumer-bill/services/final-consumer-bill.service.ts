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
import { getCookie, isValidToken } from '../../../utils/common.utils';

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
   * Realizar petición HTTP usando Fetch API con logging mejorado
   */
  private performFetch<T>(url: string, method: string, body?: any): Observable<T> {
    console.log(`🌐 Iniciando ${method} request a:`, url);
    console.log('🍪 Cookies actuales:', document.cookie);
    
    const options = this.getFetchOptions(method, body);
    console.log('📋 Opciones de fetch:', {
      method,
      headers: options.headers,
      credentials: options.credentials,
      hasBody: !!options.body
    });
    
    const fetchPromise = fetch(url, options)
      .then(async (response) => {
        console.log(`📡 Respuesta recibida - Status: ${response.status}`);
        console.log('📋 Content-Type:', response.headers.get('content-type'));
        console.log('📋 Headers disponibles:', response.headers);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Error HTTP ${response.status}:`, errorText);
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
      })
      .catch((error) => {
        console.error('🚨 Error en fetch:', error);
        throw error;
      });

    return from(fetchPromise);
  }

  /**
   * Obtener opciones para fetch con autenticación mejorada
   */
  private getFetchOptions(method: string = 'GET', body?: any): RequestInit {
    console.log(`🔧 Configurando petición ${method} a API...`);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // Usar AuthService para obtener el token (más confiable)
    const token = this.authService.getToken();
    console.log(`🔍 Token obtenido del AuthService: ${token ? `${token.substring(0, 20)}...` : 'No encontrado'}`);
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('✅ Header Authorization agregado');
    } else {
      console.log('⚠️ No se encontró token - request sin autorización');
    }

    const options: RequestInit = {
      method,
      headers,
      credentials: 'include' // Para enviar cookies automáticamente
    };

    if (body && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    return options;
  }

  /**
   * Obtener JWT token para autorización
   */
  private getJWTToken(): string | null {
    // Intentar obtener desde múltiples fuentes
    const sources = [
      () => localStorage.getItem('authToken'),
      () => localStorage.getItem('token'),
      () => localStorage.getItem('jwt'),
      () => getCookie('authToken'),
      () => getCookie('token'),
      () => getCookie('jwt'),
      () => sessionStorage.getItem('authToken'),
      () => sessionStorage.getItem('token')
    ];

    for (const getToken of sources) {
      const token = getToken();
      if (isValidToken(token) && token!.length > 20) {
        return token;
      }
    }

    return null;
  }

  // Métodos de compatibilidad con nombres anteriores
  getAllFinalConsumerBillsWithFetch(): Observable<FinalConsumerBillListDTO[]> {
    return this.getAllFinalConsumerBills();
  }

  createFinalConsumerBillWithFetch(bill: CreateFinalConsumerBillDTO): Observable<string> {
    return this.createFinalConsumerBill(bill);
  }
}