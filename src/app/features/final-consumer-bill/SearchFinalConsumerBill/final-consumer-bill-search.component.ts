import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FinalConsumerBillDetailDTO } from '../dtos/final-consumer-bill.dto';
import { FinalConsumerBillService } from '../services/final-consumer-bill.service';
import { FinalConsumerBillNavComponent } from '../CreateFinalConsumerBill/final-consumer-bill-nav.component';

@Component({
  selector: 'app-final-consumer-bill-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FinalConsumerBillNavComponent],
  templateUrl: './final-consumer-bill-search.component.html',
  styleUrls: ['./final-consumer-bill-search.component.scss']
})
export class FinalConsumerBillSearchComponent {
  searchForm: FormGroup;
  loading = false;
  searchResult: FinalConsumerBillDetailDTO | null = null;
  errorMsg = '';
  hasSearched = false;

  constructor(private fb: FormBuilder, private billService: FinalConsumerBillService) {
    this.searchForm = this.fb.group({
      generationCode: [''] // Quitamos validaciones temporalmente para debugging
    });
  }

  search(): void {
    const generationCode = this.searchForm.get('generationCode')?.value?.trim();
    
    if (generationCode) { // Solo verificamos que no esté vacío
      this.loading = true;
      this.errorMsg = '';
      this.searchResult = null;
      this.hasSearched = false;
      
      console.log('🔍 Buscando factura con código:', generationCode);
      
      this.billService.getFinalConsumerBillByGenerationCode(generationCode).subscribe({
        next: (result: FinalConsumerBillDetailDTO) => {
          this.searchResult = result;
          this.hasSearched = true;
          console.log('✅ Factura encontrada:', result);
        },
        error: (err: any) => {
          this.errorMsg = 'No se encontró ninguna factura con ese código de generación';
          this.hasSearched = true;
          console.error('❌ Error en búsqueda:', err);
          console.error('❌ Status del error:', err.status);
          console.error('❌ Mensaje del backend:', err.error);
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      console.warn('⚠️ Código de generación vacío');
    }
  }

  clearSearch(): void {
    this.searchForm.reset();
    this.searchResult = null;
    this.errorMsg = '';
    this.hasSearched = false;
  }

  // Método para calcular el subtotal de productos
  calculateSubtotal(): number {
    if (!this.searchResult?.products) return 0;
    return this.searchResult.products.reduce((sum, product) => 
      sum + (product.quantity * product.price), 0
    );
  }

  // Método para imprimir la factura
  printBill(): void {
    if (this.searchResult) {
      window.print();
    }
  }
}