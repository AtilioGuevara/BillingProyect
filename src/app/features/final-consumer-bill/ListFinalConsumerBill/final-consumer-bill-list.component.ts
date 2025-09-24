import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { FinalConsumerBillListDTO } from '../dtos/final-consumer-bill.dto';
import { FinalConsumerBillNavComponent } from '../CreateFinalConsumerBill/final-consumer-bill-nav.component';

@Component({
  selector: 'app-final-consumer-bill-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FinalConsumerBillNavComponent],
  templateUrl: './final-consumer-bill-list.component.html',
  styleUrls: ['./final-consumer-bill-list.component.scss']
})
export class FinalConsumerBillListComponent implements OnInit {
  bills: FinalConsumerBillListDTO[] = [];
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
      next: (data: FinalConsumerBillListDTO[]) => {
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

  getStatusText(status: string | undefined | null): string {
    const statusMap: { [key: string]: string } = {
      'DRAFT': 'Borrador',
      'SENT': 'Enviada',
      'PENDING': 'Pendiente',
      'APPROVED': 'Aprobada',
      'REJECTED': 'Rechazada'
    };
    return statusMap[status || 'DRAFT'] || 'Sin Estado';
  }
}
