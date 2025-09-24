import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError, of } from 'rxjs';
import { 
  CreateFinalConsumerBillDTO, 
  FinalConsumerBillListDTO, 
  FinalConsumerBillDetailDTO 
} from '../dtos/final-consumer-bill.dto';
import { environment } from '../../../../environments/environment';
import { AuthTokenService } from '../../auth/auth-token.service';

@Injectable({ providedIn: 'root' })
export class FinalConsumerBillService {
  // URLs específicas por puerto según configuración del backend
  private apiCreateUrl = environment.apiCreateUrl; // Puerto 8080 para CREATE
  private apiReadUrl = environment.apiReadUrl;     // Puerto 8090 para READ
  
  // Headers para CORS, comunicación con VPS y cookies de autenticación
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    withCredentials: true // Habilitamos cookies para autenticación
  };

  constructor(
    private http: HttpClient,
    private authTokenService: AuthTokenService
  ) {
    console.log('🌐 CONFIGURACIÓN DE SERVICIOS:');
    console.log('🌐 API CREATE URL configurada:', this.apiCreateUrl);
    console.log('🌐 API READ URL configurada:', this.apiReadUrl);
    console.log('🌐 Environment apiCreateUrl:', environment.apiCreateUrl);
    console.log('🌐 Environment apiReadUrl:', environment.apiReadUrl);
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
    
    // POST simple con datos en body - el interceptor agregará automáticamente el Bearer token
    return this.http.post<string>(url, bill, this.httpOptions);
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
    
    // GET simple - el interceptor agregará automáticamente el Bearer token
    return this.http.get<FinalConsumerBillListDTO[]>(url, this.httpOptions).pipe(
      tap((bills: FinalConsumerBillListDTO[]) => {
        console.log('📋 FACTURAS OBTENIDAS - TOTAL:', bills.length);
        bills.forEach((bill, index) => {
          console.log(`📄 Factura ${index + 1}:`);
          console.log(`   - Código Generación: "${bill.generationCode}"`);
          console.log(`   - Número Control: ${bill.controlNumber}`);
          console.log(`   - Cliente: ${bill.customerName || 'Sin nombre'}`);
          console.log(`   - Fecha: ${bill.billGenerationDate}`);
          console.log(`   - Total: $${bill.totalWithIva}`);
          console.log('   ---');
        });
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

  // GET: Obtener factura completa por código de generación (GET simple con Bearer token via interceptor)
  // URL: http://37.60.243.227:8090/api/final-consumer/generation-code/{generationCode}
  // Retorna: Factura completa con todos los detalles (ShowBillDto)
  getFinalConsumerBillByGenerationCode(generationCode: string): Observable<FinalConsumerBillDetailDTO> {
    const url = `${this.apiReadUrl}${environment.endpoints.finalConsumerBill.getByGenerationCode}/${generationCode}`;
    
    console.log('🔍 BÚSQUEDA POR CÓDIGO DE GENERACIÓN');
    console.log(`🔍 Código buscado: "${generationCode}"`);
    console.log(`🔍 URL completa: ${url}`);
    console.log('🔍 Usando Bearer token via interceptor');
    
    // GET simple - el interceptor agregará automáticamente el Bearer token
    return this.http.get<FinalConsumerBillDetailDTO>(url, this.httpOptions).pipe(
      tap((result: FinalConsumerBillDetailDTO) => {
        console.log('✅ FACTURA ENCONTRADA:', result);
      })
    );
  }
}
