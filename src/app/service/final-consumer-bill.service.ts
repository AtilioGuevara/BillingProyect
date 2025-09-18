import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateFinalConsumerBillDTO } from '../dtos/final-consumer-bill.dto';

@Injectable({ providedIn: 'root' })
export class FinalConsumerBillService {
  private apiUrl = '/api/final-consumer/create';

  constructor(private http: HttpClient) {}

  createFinalConsumerBill(bill: CreateFinalConsumerBillDTO): Observable<string> {
    return this.http.post<string>(this.apiUrl, bill);
  }
}
