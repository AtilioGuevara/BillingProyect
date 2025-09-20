import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateFinalConsumerBillDTO, FinalConsumerBillListDTO } from '../dtos/final-consumer-bill.dto';

@Injectable({ providedIn: 'root' })
export class FinalConsumerBillService {
  private baseUrl = '/api/final-consumer';

  constructor(private http: HttpClient) {}

  createFinalConsumerBill(bill: CreateFinalConsumerBillDTO): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/create`, bill);
  }

  getAllFinalConsumerBills(): Observable<FinalConsumerBillListDTO[]> {
    return this.http.get<FinalConsumerBillListDTO[]>(`${this.baseUrl}/getAll`);
  }
}
