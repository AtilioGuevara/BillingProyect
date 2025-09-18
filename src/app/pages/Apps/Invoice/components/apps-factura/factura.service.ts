import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Factura {
  id?: string;
  companyName: string;
  companyNIT: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  clientName: string;
  clientDUI: string;
  clientPhone: number;
  clientEmail: string;
  date: string;
  total?: number;
}

@Injectable({ providedIn: 'root' })
export class FacturaService {
  private apiUrl = 'API_URL_AQUI'; // Reemplazar por la URL real

  constructor(private http: HttpClient) {}

  crearFactura(factura: Omit<Factura, 'id'>): Observable<Factura> {
    return this.http.post<Factura>(`${this.apiUrl}/facturas`, factura);
  }

  listarFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.apiUrl}/facturas`);
  }

  buscarFacturaPorId(id: string): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/facturas/${id}`);
  }
}
