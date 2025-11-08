import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  dui: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientSearchService {
  private searchSubject = new BehaviorSubject<string>('');
  private baseUrl = environment.clientApiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Busca clientes basado en el filtro proporcionado
   */
  searchClients(filter: string): Observable<Cliente[]> {
    if (!filter || filter.trim().length < 2) {
      return of([]);
    }

    const url = `${this.baseUrl}${encodeURIComponent(filter.trim())}`;
    
    return this.http.get<Cliente[]>(url).pipe(
      catchError(error => {
        console.error('Error searching clients:', error);
        return of([]);
      })
    );
  }

  /**
   * Observable para búsqueda con debounce
   */
  getSearchResults(): Observable<Cliente[]> {
    return this.searchSubject.pipe(
      debounceTime(300), // Espera 300ms después de que el usuario deje de escribir
      distinctUntilChanged(), // Solo busca si el término cambió
      switchMap(term => this.searchClients(term))
    );
  }

  /**
   * Actualiza el término de búsqueda
   */
  updateSearchTerm(term: string): void {
    this.searchSubject.next(term);
  }

  /**
   * Limpia la búsqueda
   */
  clearSearch(): void {
    this.searchSubject.next('');
  }
}