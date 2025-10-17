import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';

import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { FinalConsumerBillDetailDTO } from '../../../dtos/final-consumer-bill.dto';

@Component({
  selector: 'app-final-consumer-bill-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-consumer-bill-view.component.html',
  styleUrls: ['./final-consumer-bill-view.component.scss']
})
export class FinalConsumerBillViewComponent implements OnInit {
  bill: FinalConsumerBillDetailDTO | null = null;
  loading = false;
  error: string | null = null;
  generationCode: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private finalConsumerBillService: FinalConsumerBillService
  ) {}

  ngOnInit(): void {
    this.generationCode = this.route.snapshot.paramMap.get('generationCode');
    if (this.generationCode) {
      this.loadBill(this.generationCode);
    } else {
      this.error = 'No se proporcionó un código de generación válido';
    }
  }

  private formatBillData(): void {
    if (this.bill) {
      if (this.bill.receiver?.customerDocument) {
        this.bill.receiver.customerDocument = this.formatDocument(this.bill.receiver.customerDocument);
      }
      if (this.bill.receiver?.customerPhone) {
        this.bill.receiver.customerPhone = this.formatPhone(this.bill.receiver.customerPhone);
      }
      if (this.bill.transmitter?.companyDocument) {
        this.bill.transmitter.companyDocument = this.formatDocument(this.bill.transmitter.companyDocument);
      }
      if (this.bill.transmitter?.companyPhone) {
        this.bill.transmitter.companyPhone = this.formatPhone(this.bill.transmitter.companyPhone);
      }
    }
  }

  private formatDocument(document: string): string {
  const regex = /^\d{8}-\d$/;
  if (!regex.test(document)) {
    return document.slice(0, 8) + '-' + document.slice(8);
  }
  return document;
  }

  private formatPhone(phone: string): string {
  const regex = /^\d{4}-\d{4}$/;
  if (!regex.test(phone)) {
    return phone.slice(0, 4) + '-' + phone.slice(4);
  }
    return phone;
  }

  private loadBill(generationCode: string): void {
    this.loading = true;
    this.error = null;

    console.log('🔍 Cargando factura con código:', generationCode);

    this.finalConsumerBillService.getFinalConsumerBillByGenerationCode(generationCode)
      .pipe(
        tap(response => {
          console.log('✅ Factura cargada exitosamente:', response);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (bill) => {
          this.bill = bill;
          this.formatBillData();
        },
        error: (error) => {
          console.error('❌ Error al cargar factura:', error);
          console.error('❌ Status:', error.status);
          console.error('❌ URL solicitada:', error.url);
          console.error('❌ Mensaje del backend:', error.error);
          
          if (error.status === 404) {
            this.error = `No se encontró la factura con código: ${generationCode}

Posibles causas:
• La factura no existe en el sistema
• El código de generación es incorrecto
• No hay datos de prueba disponibles

Sugerencias:
• Verifica que el código sea correcto
• Consulta la lista de facturas existentes
• Contacta al administrador si el problema persiste`;
          } else if (error.status === 401) {
            this.error = 'No tienes permisos para ver esta factura. Por favor, inicia sesión nuevamente.';
            // Opcionalmente redirigir al login
            // this.router.navigate(['/login']);
          } else if (error.status === 500) {
            this.error = 'Error interno del servidor. Por favor, contacta al administrador.';
          } else {
            this.error = `Error al cargar la factura: ${error.message || 'Error desconocido'}`;
          }
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/final-consumer-bill/list']);
  }

  goToCreate(): void {
    this.router.navigate(['/final-consumer-bill/create']);
  }

  printBill(): void {
    if (this.bill) {
      window.print();
    }
  }

  getProductNameById(productId: number): string {
    const product = this.bill?.products?.find(p => p.productId === productId);
    return product ? product.name : `Producto ID: ${productId}`;
  }
}
