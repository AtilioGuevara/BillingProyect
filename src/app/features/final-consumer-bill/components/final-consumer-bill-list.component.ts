import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { CreateFinalConsumerBillDTO } from '../dtos/final-consumer-bill.dto';

@Component({
  selector: 'app-final-consumer-bill-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-consumer-bill-list.component.html',
  styleUrls: ['./final-consumer-bill-list.component.scss']
})
export class FinalConsumerBillListComponent implements OnInit {
  bills: CreateFinalConsumerBillDTO[] = [];
  loading = false;
  errorMsg = '';

  constructor(private billService: FinalConsumerBillService) {}

  ngOnInit(): void {
    this.loadBills();
  }

  loadBills(): void {
    this.loading = true;
    this.errorMsg = '';
    
    this.billService.getAllFinalConsumerBills().subscribe({
      next: (data: CreateFinalConsumerBillDTO[]) => {
        this.bills = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading bills:', error);
        this.errorMsg = 'Error al cargar las facturas. Verifique que el endpoint del backend esté disponible.';
        this.loading = false;
      }
    });
  }

  refreshBills(): void {
    this.loadBills();
  }
}
