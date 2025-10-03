import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { FinalConsumerBillListDTO } from '../../../dtos/final-consumer-bill.dto';
import { FinalConsumerBillNavComponent } from '../../NavComponents/final-consumer-bill-nav.component';

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

  constructor(private billService: FinalConsumerBillService, private router: Router) {}

    // Método para navegar a la vista de detalles
  viewBillDetails(generationCode: string): void {
    console.log('🔍 Navegando a detalles de factura:', generationCode);
    this.router.navigate(['/final-consumer-bill/view', generationCode]);
  }

  // Método alternativo si tienes el objeto completo de la factura
  viewBillDetailsFromObject(bill: any): void {
    if (bill.generationCode) {
      this.viewBillDetails(bill.generationCode);
    } else {
      console.error('❌ La factura no tiene código de generación:', bill);
    }
  }

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
