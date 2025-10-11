import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError, of, map } from 'rxjs';
import { 
  CreateFinalConsumerBillDTO, 
  FinalConsumerBillListDTO, 
  FinalConsumerBillDetailDTO 
} from '../../../dtos/final-consumer-bill.dto';
import { environment } from '../../../../environments/environment';
import { getCookie } from '../../../utils/cookie';
// La autenticación ahora es manejada por DevBadge de Colibrihub

@Injectable({ providedIn: 'root' })
export class FinalConsumerBillService {
  // URLs específicas por puerto según configuración del backend
  private apiCreateUrl = environment.apiCreateUrl; // Puerto 8080 para CREATE
  private apiReadUrl = environment.apiReadUrl;     // Puerto 8090 para READ
  


  constructor(
    private http: HttpClient
  ) {
    console.log('🌐 CONFIGURACIÓN DE SERVICIOS:');
    console.log('🌐 API CREATE URL configurada:', this.apiCreateUrl);
    console.log('🌐 API READ URL configurada:', this.apiReadUrl);
    console.log('🌐 Environment apiCreateUrl:', environment.apiCreateUrl);
    console.log('🌐 Environment apiReadUrl:', environment.apiReadUrl);
  }

  /**
   * Obtiene las opciones HTTP apropiadas según el modo (desarrollo/producción)
   * En desarrollo: agrega Bearer token desde cookie
   * En producción: las cookies httpOnly se manejan automáticamente
   */
  private getHttpOptions(): { headers: HttpHeaders, withCredentials: boolean } {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // En producción, las cookies httpOnly se manejan automáticamente
    if (!isDevMode()) {
      console.log('🚀 Modo producción - usando cookies httpOnly automáticas');
      return { headers, withCredentials: true };
    }

    // En modo desarrollo, necesitamos agregar Bearer token desde cookie
    console.log('🔧 Modo desarrollo - agregando Bearer token desde cookie');
    const token = getCookie('token');
    
    if (token) {
      console.log('🍪 Token encontrado en cookie para desarrollo');
      headers = headers.set('Authorization', `Bearer ${token}`);
    } else {
      console.warn('⚠️ No se encontró token en cookie para modo desarrollo');
    }

    return { headers, withCredentials: true };
  }



  // POST: Crear nueva factura (POST simple con Bearer token via interceptor)
  // URL: http://37.60.243.227:8080/api/final-consumer/create
  createFinalConsumerBill(bill: CreateFinalConsumerBillDTO): Observable<string> {
    const url = `${this.apiCreateUrl}${environment.endpoints.finalConsumerBill.create}`;
    
    console.log('📤 CREANDO NUEVA FACTURA:');
    console.log('📤 URL construida:', url);
    console.log('📤 Base apiCreateUrl:', this.apiCreateUrl);
    console.log('📤 Endpoint path:', environment.endpoints.finalConsumerBill.create);
    console.log('📤 Usando Bearer token via interceptor');
    console.log('📤 Datos de factura:', bill);
    
    // POST simple con datos en body - usando patrón de cookies con isDevMode
    return this.http.post<string>(url, bill, this.getHttpOptions());
  }

  // GET: Obtener todas las facturas (GET simple con Bearer token via interceptor)
  // URL: http://37.60.243.227:8090/api/final-consumer/all
  // Retorna: Lista simplificada para tabla
  getAllFinalConsumerBills(): Observable<FinalConsumerBillListDTO[]> {
    const url = `${this.apiReadUrl}${environment.endpoints.finalConsumerBill.getAll}`;
    
    console.log('📥 OBTENIENDO LISTA DE FACTURAS:');
    console.log('📥 URL construida:', url);
    console.log('📥 Base apiReadUrl:', this.apiReadUrl);
    console.log('📥 Endpoint path:', environment.endpoints.finalConsumerBill.getAll);
    console.log('📥 Usando Bearer token via interceptor');
    
    // GET simple - usando patrón de cookies con isDevMode
    return this.http.get<FinalConsumerBillListDTO[]>(url, this.getHttpOptions()).pipe(
      tap((bills: FinalConsumerBillListDTO[]) => {
        console.log('📋 FACTURAS OBTENIDAS - TOTAL:', bills.length);
      }),
      catchError((error: any) => {
        console.error('❌ ERROR DETALLADO EN GET ALL:');
        console.error('❌ Status:', error.status);
        console.error('❌ Status Text:', error.statusText);
        console.error('❌ URL:', error.url);
        console.error('❌ Error completo:', error);
        console.error('❌ Body del error:', error.error);
        
        // Si es error 400, podría ser problema de endpoint
        if (error.status === 400) {
          console.error('⚠️ Error 400: Posibles causas:');
          console.error('   1. El endpoint no existe o es incorrecto');
          console.error('   2. Faltan headers requeridos por el backend');
          console.error('   3. Se requiere autenticación');
          console.error('   4. El backend espera parámetros específicos');
        }
        
        return throwError(() => error);
      })
    );
  }

  // GET: Obtener factura completa por código de generación
  // URL: http://bill.beckysflorist.site/api/get/generation-code/{generationCode}
  // Retorna: Factura completa con todos los detalles (JSON del backend)
  getFinalConsumerBillByGenerationCode(generationCode: string): Observable<FinalConsumerBillDetailDTO> {
    const url = `${this.apiReadUrl}${environment.endpoints.finalConsumerBill.getByGenerationCode}/${generationCode}`;
    
    console.log('🔍 BÚSQUEDA POR CÓDIGO DE GENERACIÓN');
    console.log(`🔍 Código buscado: "${generationCode}"`);
    console.log(`🔍 apiReadUrl: "${this.apiReadUrl}"`);
    console.log(`🔍 endpoint: "${environment.endpoints.finalConsumerBill.getByGenerationCode}"`);
    console.log(`🔍 URL completa construida: ${url}`);
    console.log('🔍 Endpoint actualizado: GET /api/get/generation-code/{code}');
    console.log('� Dominio nuevo: bill.beckysflorist.site');
    
    // GET simple - usando patrón de cookies con isDevMode
    return this.http.get<FinalConsumerBillDetailDTO>(url, this.getHttpOptions()).pipe(
      tap((result: FinalConsumerBillDetailDTO) => {
        console.log('✅ FACTURA ENCONTRADA CON NUEVA CONFIGURACIÓN:', result);
      }),
      catchError(error => {
        console.error('❌ ERROR CON NUEVA CONFIGURACIÓN:');
        console.error('❌ Status:', error.status);
        console.error('❌ URL solicitada:', error.url);
        console.error('❌ Response:', error.error);
        console.error('❌ Error completo:', error);
        return throwError(() => error);
      })
    );
  }

  // Método de prueba para llamada directa al backend (sin proxy)
  testDirectBackendCall(generationCode: string): Observable<FinalConsumerBillDetailDTO> {
    const directUrl = `https://bill.beckysflorist.site/api/get/generation-code/${generationCode}`;
    
    console.log('🧪 PROBANDO LLAMADA DIRECTA AL BACKEND:');
    console.log(`🔗 URL directa: ${directUrl}`);
    
    return this.http.get<FinalConsumerBillDetailDTO>(directUrl, this.getHttpOptions()).pipe(
      tap((result: FinalConsumerBillDetailDTO) => {
        console.log('✅ ¡ÉXITO CON LLAMADA DIRECTA!');
        console.log('✅ El backend funciona, el problema es el proxy');
        console.log('✅ Factura encontrada:', result);
      }),
      catchError(directError => {
        console.error('❌ LLAMADA DIRECTA TAMBIÉN FALLÓ:');
        console.error('❌ Status:', directError.status);
        console.error('❌ URL directa:', directError.url);
        console.error('❌ Response:', directError.error);
        console.error('');
        console.error('🔍 Posibles causas:');
        console.error('   1. Backend no disponible en bill.beckysflorist.site');
        console.error('   2. Endpoint /api/get/generation-code/{code} incorrecto');
        console.error('   3. Problemas de CORS desde localhost');
        console.error('   4. Backend requiere autenticación específica');
        
        return throwError(() => directError);
      })
    );
  }

  // GET: Buscar productos activos por nombre en el inventario
  searchActiveProductsByName(name: string = ''): Observable<any[]> {
    const url = `${environment.inventoryApiUrl}`;
    let params = new HttpParams();
    
    // Solo productos activos
    params = params.set('active', 'true');
    
    // Si hay un nombre para filtrar, agregarlo
    if (name.trim()) {
      params = params.set('name', name.trim());
    }

    console.log('🔍 BUSCANDO PRODUCTOS ACTIVOS EN EL INVENTARIO');
    console.log('🔍 URL:', url);
    console.log('🔍 Parámetros:', params.toString());
    console.log('🔍 Solo productos activos (active=true)');

    return this.http.get<any[]>(url, { 
      params,
      ...this.getHttpOptions() 
    }).pipe(
      tap((products) => {
        const activeProducts = products.filter(p => p.active === true);
        console.log('✅ PRODUCTOS ACTIVOS ENCONTRADOS:', activeProducts.length);
        console.log('✅ PRODUCTOS:', activeProducts);
      }),
      // Filtrar solo productos activos por si el backend no lo hace
      map((products: any[]) => products.filter((product: any) => product.active === true)),
      catchError((error) => {
        console.error('❌ ERROR AL BUSCAR PRODUCTOS ACTIVOS:', error);
        return throwError(() => error);
      })
    );
  }

  // GET: Obtener todos los productos activos (para cargar inicialmente)
  getAllActiveProducts(): Observable<any[]> {
   return this.http.get<any[]>(`${environment.inventoryApiUrl}`).pipe(
    map(products => products.filter(product => product.active)) // Filtrar solo productos activos
  );
}
}
